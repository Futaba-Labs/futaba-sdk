import { BigNumber, ethers } from "ethers";
import { BASE_QUERY_COST, ChainStage, NATIVE_TOKEN, RPCS } from "./constants";
import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import { ORACLE_FEE, PROTOCOL_FEE } from "./constants/feeList";

export interface FeeParam {
  chainId: number;
  stage: ChainStage,
  rpc?: string;
}

const relay = new GelatoRelay();

export class Fee {
  public chainId: number;
  public stage: ChainStage;
  public provider: ethers.providers.JsonRpcProvider;

  constructor(param: FeeParam) {
    this.chainId = param.chainId;
    this.stage = param.stage;
    let rpc: string;
    if (param.rpc) {
      rpc = param.rpc;
    } else {
      const r = RPCS[param.chainId as keyof typeof RPCS]
      if (!r) throw new Error("RPC not found");
      rpc = r;
    }

    this.provider = new ethers.providers.JsonRpcProvider(rpc);
  }

  public async estimateFee(querySize: number, gasLimit: BigNumber = BigNumber.from("1000000")) {
    if (querySize <= 0) throw new Error("querySize must be positive")
    const gelatoFee = await relay.getEstimatedFee(this.chainId, NATIVE_TOKEN, gasLimit, true)

    const proofFee = BigNumber.from((BASE_QUERY_COST * querySize).toString())

    const oracleFee = BigNumber.from(ORACLE_FEE[this.chainId as keyof typeof ORACLE_FEE]) || BigNumber.from("0")

    const protocolFee = BigNumber.from(PROTOCOL_FEE[this.chainId as keyof typeof PROTOCOL_FEE]) || BigNumber.from("0")

    const totalFee = gelatoFee.add(proofFee).add(oracleFee).add(protocolFee)

    return totalFee
  }
}
