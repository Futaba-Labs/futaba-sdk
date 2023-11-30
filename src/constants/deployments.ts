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
    [ChainKey.MUMBAI]: "0x01E0698e24fD0ea124ED539Bc8570b68548061C5",
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
    [ChainKey.MUMBAI]: "0x87bbEfB934B52Dd329f26ccb7B903eEbc4d0c6b8",
    [ChainKey.ARBITRUM_GOERLI]: "",
    [ChainKey.OPTIMISM_GOERLI]: "",
  },
  [ChainStage.DEVNET]: {
    [ChainKey.GOERLI]: "",
    [ChainKey.MUMBAI]: "0x87bbEfB934B52Dd329f26ccb7B903eEbc4d0c6b8",
    [ChainKey.ARBITRUM_GOERLI]: "",
    [ChainKey.OPTIMISM_GOERLI]: "",
  }
}
