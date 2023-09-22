import { BigNumber, ContractTransaction, ethers } from "ethers";
import { ChainId, ChainStage, FutabaQueryAPI } from ".";
import { QueryStatus } from "./constants/QueryStatus";
import { getLightClientAddress, getGatewayContract, QueryRequest } from "./utils";

export class FutabaGateway {
  readonly stage: ChainStage;
  readonly chainId: ChainId;
  readonly provider: ethers.providers.JsonRpcProvider;
  private lightClient: string;
  private gateway: ethers.Contract;

  constructor(stage: ChainStage, chainId: ChainId, provider: ethers.providers.JsonRpcProvider, lightClient?: string) {
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

  async sendQuery(queries: QueryRequest[], callBack: string, message: string, gasLimit: BigNumber = BigNumber.from("1000000")): Promise<ethers.ContractReceipt> {
    if (queries.length > 10) throw new Error("Too many queries")

    const queryAPI = new FutabaQueryAPI(this.chainId, this.stage, this.provider, { lightClient: this.lightClient });
    const fee = await queryAPI.estimateFee(queries, gasLimit)

    const tx: ContractTransaction = await this.gateway.query(queries, this.lightClient, callBack, message, { gasLimit, value: fee })
    const resTx = await tx.wait()

    return resTx
  }

  async getCache(queries: QueryRequest[]): Promise<[]> {
    const cache: [] = await this.gateway.getCache(queries)
    return cache
  }

  async getQueryStatus(queryId: string): Promise<QueryStatus> {
    const status: number = await this.gateway.getQueryStatus(queryId)
    return status as QueryStatus;
  }
}