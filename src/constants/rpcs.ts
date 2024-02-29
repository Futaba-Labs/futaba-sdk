import { ChainKey, ChainStage } from ".";

export const RPCS: Record<ChainStage, Partial<Record<ChainKey, string>>> = {
  [ChainStage.MAINNET]: {
    [ChainKey.ETHEREUM]: "",
    [ChainKey.POLYGON]: "",
    [ChainKey.ARBITRUM]: "",
    [ChainKey.OPTIMISM]: "",
  },
  [ChainStage.TESTNET]: {
    [ChainKey.GOERLI]: "https://rpc.ankr.com/eth_goerli",
    [ChainKey.MUMBAI]: "https://rpc-mumbai.maticvigil.com",
    [ChainKey.ARBITRUM_GOERLI]: "https://endpoints.omniatech.io/v1/arbitrum/goerli/public",
    [ChainKey.OPTIMISM_GOERLI]: "https://goerli-optimism.etherscan.io",
    [ChainKey.ARBITRUM_SEPOLIA]: "https://sepolia-rollup.arbitrum.io/rpc",
    [ChainKey.OPTIMISM_SEPOLIA]: "https://sepolia.optimism.io",
    [ChainKey.SEPOLIA]: "https://ethereum-sepolia-rpc.publicnode.com",
  },
  [ChainStage.DEVNET]: {
    [ChainKey.GOERLI]: "https://rpc.ankr.com/eth_goerli",
    [ChainKey.MUMBAI]: "https://rpc-mumbai.maticvigil.com",
    [ChainKey.ARBITRUM_GOERLI]: "https://endpoints.omniatech.io/v1/arbitrum/goerli/public",
    [ChainKey.OPTIMISM_GOERLI]: "https://goerli-optimism.etherscan.io",
    [ChainKey.ARBITRUM_SEPOLIA]: "https://sepolia-rollup.arbitrum.io/rpc",
    [ChainKey.OPTIMISM_SEPOLIA]: "https://sepolia.optimism.io",
    [ChainKey.SEPOLIA]: "https://ethereum-sepolia-rpc.publicnode.com",
  },
}
