import { ChainId } from ".";

export const PROTOCOL_FEE: { [chainId in ChainId]?: number } = {
  [ChainId.GOERLI]: 0,
  [ChainId.MUMBAI]: 0,
  [ChainId.ARBITRUM_GOERLI]: 0,
  [ChainId.OPTIMISM_GOERLI]: 0,
}

export const ORACLE_FEE: { [chainId in ChainId]?: number } = {
  [ChainId.GOERLI]: 0,
  [ChainId.MUMBAI]: 0,
  [ChainId.ARBITRUM_GOERLI]: 0,
  [ChainId.OPTIMISM_GOERLI]: 0,
}
