import { ChainKey, ChainStage } from ".";

export const RPCS: Record<ChainStage, Partial<Record<ChainKey, string>>> = {
  [ChainStage.MAINNET]: {
    [ChainKey.ETHEREUM]: "",
    [ChainKey.POLYGON]: "",
    [ChainKey.ARBITRUM]: "",
    [ChainKey.OPTIMISM]: "",
  },
  [ChainStage.TESTNET]: {
    [ChainKey.GOERLI]: "https://rpc.goerli.mudit.blog/",
    [ChainKey.MUMBAI]: "https://rpc-mumbai.maticvigil.com",
    [ChainKey.ARBITRUM_GOERLI]: "https://goerli-rollup.arbitrum.io/rpc/",
    [ChainKey.OPTIMISM_GOERLI]: "https://goerli.optimism.io/",
  },
}
