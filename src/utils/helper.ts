import { ethers } from "ethers"
import { ChainId, ChainKey, ChainStage, GATEWAY, GATEWAY_ABI, LIGHT_CLIENT } from "../constants"

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

export function getLightClientAddress(chainId: ChainId, chainStage: ChainStage) {
  const chainKey = getChainKey(chainId)
  const lc = LIGHT_CLIENT[chainStage][chainKey];
  if (!lc) throw new Error("Light client not found")
  return lc
}

export function getGatewayContract(chainId: ChainId, chainStage: ChainStage, provider: ethers.providers.JsonRpcProvider) {
  const chainKey = getChainKey(chainId)
  const gatewayAddress = GATEWAY[chainStage][chainKey]
  if (!gatewayAddress) throw new Error("Gateway address not found")
  return new ethers.Contract(
    gatewayAddress,
    GATEWAY_ABI,
    provider
  )
}
