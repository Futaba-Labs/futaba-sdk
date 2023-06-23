import { ChainKey } from ".";

export const GATEWAY: { [chainKey in ChainKey]?: string } = {
  [ChainKey.GOERLI]: "",
  [ChainKey.MUMBAI]: "",
  [ChainKey.ARBITRUM_GOERLI]: "",
  [ChainKey.OPTIMISM_GOERLI]: "",
}

export const LIGHT_CLIENT: { [chainKey in ChainKey]?: string } = {
  [ChainKey.GOERLI]: "",
  [ChainKey.MUMBAI]: "",
  [ChainKey.ARBITRUM_GOERLI]: "",
  [ChainKey.OPTIMISM_GOERLI]: "",
}

export const ORACLE: { [chainKey in ChainKey]?: string } = {
  [ChainKey.GOERLI]: "",
  [ChainKey.MUMBAI]: "",
  [ChainKey.ARBITRUM_GOERLI]: "",
  [ChainKey.OPTIMISM_GOERLI]: "",
}
