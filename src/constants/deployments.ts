import { ChainKey, ChainStage } from ".";

export const GATEWAY: Record<ChainStage, Partial<Record<ChainKey, string>>> = {
  [ChainStage.MAINNET]: {
    [ChainKey.ETHEREUM]: "",
    [ChainKey.POLYGON]: "",
    [ChainKey.ARBITRUM]: "",
    [ChainKey.OPTIMISM]: "",
  },
  [ChainStage.TESTNET]: {
    [ChainKey.GOERLI]: "",
    [ChainKey.MUMBAI]: "0x3fab87824ABbe2DC686ed5CbB032d9c62E2fe179",
    [ChainKey.ARBITRUM_GOERLI]: "",
    [ChainKey.OPTIMISM_GOERLI]: "",
  },
}

export const LIGHT_CLIENT: Record<ChainStage, Partial<Record<ChainKey, string>>> = {
  [ChainStage.MAINNET]: {
    [ChainKey.ETHEREUM]: "",
    [ChainKey.POLYGON]: "",
    [ChainKey.ARBITRUM]: "",
    [ChainKey.OPTIMISM]: "",
  },
  [ChainStage.TESTNET]: {
    [ChainKey.GOERLI]: "",
    [ChainKey.MUMBAI]: "0xA171Ec7644385e3dcc5A68af62E6c317f210c7b9",
    [ChainKey.ARBITRUM_GOERLI]: "",
    [ChainKey.OPTIMISM_GOERLI]: "",
  },
}
