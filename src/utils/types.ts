import { BigNumberish, BytesLike, ethers } from "ethers";

export interface QueryRequest {
  dstChainId: BigNumberish;
  to: string;
  height: BigNumberish;
  slot: BytesLike;
}

export interface QueryResponse {
  tx: ethers.ContractReceipt;
  queryId: string;
}

export type Provider = ethers.Wallet | ethers.providers.Web3Provider | ethers.Signer
