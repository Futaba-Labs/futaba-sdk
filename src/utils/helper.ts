import { ChainId, ChainKey } from "../constants"

export function getChainKey(chainId: ChainId): ChainKey {
  const key = ChainId[chainId]
  // @ts-ignore
  const chainKey: ChainKey = ChainKey[key]
  if (chainKey) return chainKey
  throw new Error(`No ChainKey for ${chainId}`)
}

export function getChainIdByChainKey(chainKey: ChainKey): ChainId {
  // @ts-ignore
  const key = ChainKey[chainKey]
  // @ts-ignore
  const chainId: ChainId = ChainId[key]
  if (chainId) return chainId
  throw new Error(`No chainId for ${chainKey}`)
}
