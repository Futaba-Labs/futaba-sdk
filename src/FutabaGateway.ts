import { BigNumber, ContractTransaction, ethers } from "ethers";
import { ChainId, ChainStage, FutabaQueryAPI } from ".";
import { QueryStatus } from "./constants/QueryStatus";
import { getLightClientAddress, getGatewayContract, QueryRequest, QueryResponse, Provider } from "./utils";

export class FutabaGateway {
  readonly stage: ChainStage;
  readonly chainId: ChainId;
  readonly provider: Provider;
  readonly lightClient: string;
  readonly gateway: ethers.Contract;

  constructor(stage: ChainStage, chainId: ChainId, provider: Provider, lightClient?: string) {
    this.chainId = chainId;
    this.stage = stage;
    this.provider = provider;

    if (lightClient) {
      this.lightClient = lightClient
    } else {
      this.lightClient = getLightClientAddress(chainId, stage)
    }

    this.gateway = getGatewayContract(this.chainId, this.stage, this.provider)
  }

  sendQuery = async (
    queries: QueryRequest[],
    callBack: string,
    message: string,
    gasLimit: BigNumber = BigNumber.from("1000000")
  ): Promise<QueryResponse> => {
    if (queries.length > 10) throw new Error("Too many queries")

    const queryAPI = new FutabaQueryAPI(this.stage, this.chainId, { lightClient: this.lightClient });
    const fee = await queryAPI.estimateFee(queries, gasLimit)

    try {

    } catch (error) { }

    const tx: ContractTransaction = await this.gateway.query(queries, this.lightClient, callBack, message, { gasLimit, value: fee })
    const resTx = await tx.wait()

    const events = resTx.events
    let queryId = ""
    if (events !== undefined) {
      queryId = events[0].args?.queryId
    } else {
      throw new Error("QueryId is not found")
    }

    return { tx: resTx, queryId }
  }

  getCache = async (queries: QueryRequest[]): Promise<[]> => {
    const cache: [] = await this.gateway.getCache(queries)
    return cache
  }

  getQueryStatus = async (queryId: string): Promise<QueryStatus> => {
    const status: number = await this.gateway.getQueryStatus(queryId)
    return status as QueryStatus;
  }

  waitForQueryResult = async (queryId: string) => {
    this.gateway.removeAllListeners()
    const filter = this.gateway.filters.ReceiveQuery(queryId, null, null, null, null)

    return await new Promise<[]>(async (resolve, reject) => {
      try {
        this.gateway.on(filter, async (...args) => {
          const results = args[4]
          resolve(results);
        })
      } catch (error) {
        console.error("Listener Failed: ", error)
        reject(error)
      }
    })
  }
}