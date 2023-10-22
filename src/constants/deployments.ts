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
    [ChainKey.MUMBAI]: "0x3Be18f89C371b56Ae12Ac498eE21F02219778611",
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
    [ChainKey.MUMBAI]: "0x8EDfB284e0b406F2e8C46De28A313688A762E373",
    [ChainKey.ARBITRUM_GOERLI]: "",
    [ChainKey.OPTIMISM_GOERLI]: "",
  }
}
