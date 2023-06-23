import { ChainId } from ".";

export const RPCS: { [chainId in ChainId]?: string } = {
  [ChainId.GOERLI]: "https://rpc.goerli.mudit.blog/",
  [ChainId.MUMBAI]: "https://rpc-mumbai.maticvigil.com",
  [ChainId.ARBITRUM_GOERLI]: "https://goerli-rollup.arbitrum.io/rpc/",
  [ChainId.OPTIMISM_GOERLI]: "https://goerli.optimism.io/",
}
