import { BigNumber, ethers } from "ethers";
import { BASE_QUERY_COST, ChainId, ChainStage, GATEWAY, GATEWAY_ABI, LIGHT_CLIENT, NATIVE_TOKEN, RPCS } from "./constants";
import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import { getChainKey } from "./utils/helper";
import { QueryRequest } from "./utils/types";

const relay = new GelatoRelay();

export interface Param {
  chainId: number
  stage: ChainStage,
  options?: {
    rpc?: string
    lightClient?: string
  }
}

export class FutabaQueryAPI {
  readonly stage: ChainStage;
  readonly chainId: ChainId;
  readonly provider: ethers.providers.JsonRpcProvider;
  private lightClient: string;

  constructor(param: Param) {
    this.chainId = param.chainId;
    this.stage = param.stage;
    let rpc: string,
      lightClient: string;

    if (param.options) {
      if (param.options.rpc) {
        rpc = param.options.rpc;
      } else {
        rpc = this.getRPC(param.chainId, param.stage)
      }

      if (param.options.lightClient) {
        lightClient = param.options.lightClient;
      } else {
        lightClient = this.getLightClient(param.chainId, param.stage)
      }
    } else {
      rpc = this.getRPC(param.chainId, param.stage)
      lightClient = this.getLightClient(param.chainId, param.stage)
    }

    this.lightClient = lightClient
    this.provider = new ethers.providers.JsonRpcProvider(rpc);
  }

  public async estimateFee(queries: QueryRequest[], gasLimit: BigNumber = BigNumber.from("1000000")) {
    const querySize = queries.length
    if (querySize <= 0) throw new Error("querySize must be positive")
    const gelatoFee = await relay.getEstimatedFee(this.chainId, NATIVE_TOKEN, gasLimit, true)

    const proofFee = BigNumber.from((BASE_QUERY_COST * querySize).toString())

    const oracleFee = BigNumber.from("0")

    const protocolFee = await this.estimateProtocolFee(queries)

    const totalFee = gelatoFee.add(proofFee).add(oracleFee).add(protocolFee)

    return totalFee
  }

  private async estimateProtocolFee(queries: QueryRequest[]) {
    const chainKey = getChainKey(this.chainId)
    const gatewayAddress = GATEWAY[this.stage][chainKey]
    if (!gatewayAddress) throw new Error("Gateway address not found")

    const gateway = new ethers.Contract(
      gatewayAddress,
      GATEWAY_ABI,
      this.provider
    )
    return await gateway.estimateFee(this.lightClient, queries)
  }

  private getRPC(chainId: ChainId, chainStage: ChainStage) {
    const chainKey = getChainKey(chainId)
    const r = RPCS[chainStage][chainKey]
    if (!r) throw new Error("RPC not found");
    return r
  }

  private getLightClient(chainId: ChainId, chainStage: ChainStage) {
    const chainKey = getChainKey(chainId)
    const lc = LIGHT_CLIENT[chainStage][chainKey];
    if (!lc) throw new Error("Light client not found")
    return lc
  }
}
