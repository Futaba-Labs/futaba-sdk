import { ethers } from "ethers"
import { ChainId, ChainKey, ChainStage, GATEWAY, LIGHT_CLIENT, RPCS } from "../constants"
import GATEWAY_ABI from "../../artifacts/gateway.abi.json"
import { Provider } from "."

export const getChainKey = (chainId: ChainId): ChainKey => {
  const key = ChainId[chainId]
  // @ts-ignore
  const chainKey: ChainKey = ChainKey[key]
  if (chainKey) return chainKey
  throw new Error(`No ChainKey for ${chainId}`)
}

export const getChainIdByChainKey = (chainKey: ChainKey): ChainId => {
  const ck = chainKey.toUpperCase()
  // @ts-ignore
  const chainId: ChainId = ChainId[ck]
  if (chainId) return chainId
  throw new Error(`No chainId for ${chainKey}`)
}

export const getRpc = (chainId: ChainId, chainStage: ChainStage) => {
  const chainKey = getChainKey(chainId)
  const rpc = RPCS[chainStage][chainKey]
  if (!rpc) throw new Error("RPC not found")
  return rpc
}

export const getLightClientAddress = (chainId: ChainId, chainStage: ChainStage) => {
  const chainKey = getChainKey(chainId)
  const lightClientAddress = LIGHT_CLIENT[chainStage][chainKey];
  if (!lightClientAddress) throw new Error("Light client not found")
  return lightClientAddress
}

export const getGatewayAddress = (chainId: ChainId, chainStage: ChainStage) => {
  const chainKey = getChainKey(chainId)
  const gatewayAddress = GATEWAY[chainStage][chainKey]
  if (!gatewayAddress) throw new Error("Gateway address not found")
  return gatewayAddress
}

export const getGatewayContract = (
  chainId: ChainId,
  chainStage: ChainStage,
  provider: ethers.providers.JsonRpcProvider | Provider) => {
  const gatewayAddress = getGatewayAddress(chainId, chainStage)
  return new ethers.Contract(
    gatewayAddress,
    GATEWAY_ABI,
    provider
  )
}
