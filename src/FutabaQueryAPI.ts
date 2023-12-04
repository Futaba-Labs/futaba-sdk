import { BigNumber, ethers } from "ethers";
import { BASE_QUERY_COST, ChainId, ChainStage, NATIVE_TOKEN, RPCS } from "./constants";
import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import { getLightClientAddress, QueryRequest, getGatewayContract, getChainKey, getRpc } from "./utils";

const relay = new GelatoRelay();

export class FutabaQueryAPI {
  readonly stage: ChainStage;
  readonly chainId: ChainId;
  readonly provider: ethers.providers.JsonRpcProvider;
  readonly lightClient: string;

  constructor(stage: ChainStage, chainId: ChainId, options?: {
    rpc?: string
    lightClient?: string
  }) {
    this.chainId = chainId;
    this.stage = stage;
    let rpc: string,
      lightClient: string;

    if (options) {
      if (options.rpc) {
        rpc = options.rpc;
      } else {
        rpc = getRpc(stage, chainId)
      }

      if (options.lightClient) {
        lightClient = options.lightClient;
      } else {
        lightClient = getLightClientAddress(stage, chainId)
      }
    } else {
      rpc = getRpc(stage, chainId)
      lightClient = getLightClientAddress(stage, chainId)
    }

    this.lightClient = lightClient
    this.provider = new ethers.providers.JsonRpcProvider(rpc);
  }

  estimateFee = async (queries: QueryRequest[], gasLimit: BigNumber = BigNumber.from("1000000")) => {
    const querySize = queries.length
    if (querySize <= 0) throw new Error("querySize must be positive")
    if (querySize > 10) throw new Error("Too many queries")
    const gelatoFee = await relay.getEstimatedFee(this.chainId, NATIVE_TOKEN, gasLimit, true)

    const proofFee = BigNumber.from((BASE_QUERY_COST * querySize).toString())

    const oracleFee = BigNumber.from("0")
    const protocolFee = await this.estimateProtocolFee(queries)

    const totalFee = gelatoFee.add(proofFee).add(oracleFee).add(protocolFee)

    return totalFee
  }

  private estimateProtocolFee = async (queries: QueryRequest[]) => {
    const gateway = getGatewayContract(this.stage, this.chainId, this.provider)

    return await gateway.estimateFee(this.lightClient, queries)
  }
}
