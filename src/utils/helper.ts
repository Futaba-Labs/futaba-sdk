import { ethers } from "ethers"
import { ChainId, ChainKey, ChainStage, GATEWAY, LIGHT_CLIENT, RPCS } from "../constants"
import GATEWAY_ABI from "../../artifacts/gateway.abi.json"

export function getChainKey(chainId: ChainId): ChainKey {
  const key = ChainId[chainId]
  // @ts-ignore
  const chainKey: ChainKey = ChainKey[key]
  if (chainKey) return chainKey
  throw new Error(`No ChainKey for ${chainId}`)
}

export function getChainIdByChainKey(chainKey: ChainKey): ChainId {
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

export function getLightClientAddress(chainId: ChainId, chainStage: ChainStage) {
  const chainKey = getChainKey(chainId)
  const lc = LIGHT_CLIENT[chainStage][chainKey];
  if (!lc) throw new Error("Light client not found")
  return lc
}

export function getGatewayContract(chainId: ChainId, chainStage: ChainStage, provider: ethers.providers.JsonRpcProvider | ethers.Wallet | ethers.providers.Web3Provider | ethers.Signer) {
  const chainKey = getChainKey(chainId)
  const gatewayAddress = GATEWAY[chainStage][chainKey]
  if (!gatewayAddress) throw new Error("Gateway address not found")
  return new ethers.Contract(
    gatewayAddress,
    GATEWAY_ABI,
    provider
  )
}
