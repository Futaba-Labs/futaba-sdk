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
  [ChainStage.DEVNET]: {
    [ChainKey.GOERLI]: "",
    [ChainKey.MUMBAI]: "0x098A0579Ff42523FFB3B4FBd3582A769eE5556Df",
    [ChainKey.ARBITRUM_GOERLI]: "",
    [ChainKey.OPTIMISM_GOERLI]: "",
  }
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
    [ChainKey.MUMBAI]: "0x8EDfB284e0b406F2e8C46De28A313688A762E373",
    [ChainKey.ARBITRUM_GOERLI]: "",
    [ChainKey.OPTIMISM_GOERLI]: "",
  },
  [ChainStage.DEVNET]: {
    [ChainKey.GOERLI]: "",
    [ChainKey.MUMBAI]: "0x53957A049DE3c5FAFa9DD2EaF63961A0bBdCA352",
    [ChainKey.ARBITRUM_GOERLI]: "",
    [ChainKey.OPTIMISM_GOERLI]: "",
  }
}
