import { BigNumber, ethers } from "ethers";
import { BASE_QUERY_COST, ChainId, ChainStage, NATIVE_TOKEN, RPCS } from "./constants";
import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import { getLightClientAddress, QueryRequest, getGatewayContract, getChainKey } from "./utils";

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
        rpc = this.getRPC(chainId, stage)
      }

      if (options.lightClient) {
        lightClient = options.lightClient;
      } else {
        lightClient = getLightClientAddress(chainId, stage)
      }
    } else {
      rpc = this.getRPC(chainId, stage)
      lightClient = getLightClientAddress(chainId, stage)
    }

    this.lightClient = lightClient
    this.provider = new ethers.providers.JsonRpcProvider(rpc);
  }

  async estimateFee(queries: QueryRequest[], gasLimit: BigNumber = BigNumber.from("1000000")) {
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

  private async estimateProtocolFee(queries: QueryRequest[]) {
    const gateway = getGatewayContract(this.chainId, this.stage, this.provider)

    return await gateway.estimateFee(this.lightClient, queries)
  }

  private getRPC(chainId: ChainId, chainStage: ChainStage) {
    const chainKey = getChainKey(chainId)
    const r = RPCS[chainStage][chainKey]
    if (!r) throw new Error("RPC not found");
    return r
  }
}
