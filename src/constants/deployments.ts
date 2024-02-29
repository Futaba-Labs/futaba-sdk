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
    [ChainKey.MUMBAI]: "0xDe913499273dc8767d2ffd51DE9861880E377682",
    [ChainKey.ARBITRUM_GOERLI]: "",
    [ChainKey.OPTIMISM_GOERLI]: "",
    [ChainKey.ARBITRUM_SEPOLIA]: "",
    [ChainKey.OPTIMISM_SEPOLIA]: "",
    [ChainKey.SEPOLIA]: "",
  },
  [ChainStage.DEVNET]: {
    [ChainKey.GOERLI]: "",
    [ChainKey.MUMBAI]: "0xDe913499273dc8767d2ffd51DE9861880E377682",
    [ChainKey.ARBITRUM_GOERLI]: "",
    [ChainKey.OPTIMISM_GOERLI]: "",
    [ChainKey.ARBITRUM_SEPOLIA]: "",
    [ChainKey.OPTIMISM_SEPOLIA]: "",
    [ChainKey.SEPOLIA]: "",
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
    [ChainKey.MUMBAI]: "0x276411156f985DD9425A67dC9af9175E1261B640",
    [ChainKey.ARBITRUM_GOERLI]: "",
    [ChainKey.OPTIMISM_GOERLI]: "",
    [ChainKey.ARBITRUM_SEPOLIA]: "",
    [ChainKey.OPTIMISM_SEPOLIA]: "",
    [ChainKey.SEPOLIA]: "",
  },
  [ChainStage.DEVNET]: {
    [ChainKey.GOERLI]: "",
    [ChainKey.MUMBAI]: "0x276411156f985DD9425A67dC9af9175E1261B640",
    [ChainKey.ARBITRUM_GOERLI]: "",
    [ChainKey.OPTIMISM_GOERLI]: "",
    [ChainKey.ARBITRUM_SEPOLIA]: "",
    [ChainKey.OPTIMISM_SEPOLIA]: "",
    [ChainKey.SEPOLIA]: "",
  }
}
