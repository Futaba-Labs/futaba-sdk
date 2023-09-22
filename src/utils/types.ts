import { ethers } from "ethers";

export interface QueryRequest {
  dstChainId: number;
  to: string;
  height: number;
  slot: string;
}

export interface QueryResponse {
  tx: ethers.ContractReceipt;
  queryId: string;
}
