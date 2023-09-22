import { describe, expect, test } from 'vitest'
import { getChainIdByChainKey, getChainKey, getGatewayContract, getLightClientAddress } from '../helper'
import { ChainKey, ChainStage, GATEWAY, LIGHT_CLIENT } from '../../constants'
import { ethers } from 'ethers';

describe("Helper", () => {
  if (process.env.PROVIDER_URL === undefined) {
    throw new Error('PROVIDER_URI not set');
  }

  test("getChainKey() - No chainId", () => {
    const invalidChainId = 0
    // @ts-ignore
    expect(() => getChainKey(invalidChainId)).toThrowError("No ChainKey for 0")
  })

  test("getChainKey()", () => {
    const chainId = 1
    const chainKey = getChainKey(chainId)
    expect(chainKey).toEqual(ChainKey.ETHEREUM)
  })

  test("getChainIdByChainKey() - No chainId", () => {
    const invalidChainKey = "INVALID"
    // @ts-ignore
    expect(() => getChainIdByChainKey(invalidChainKey)).toThrowError("No chainId for INVALID")
  })

  test("getChainIdByChainKey()", () => {
    const chainKey = ChainKey.ETHEREUM
    const chainId = getChainIdByChainKey(chainKey)
    expect(chainId).toEqual(1)
  })

  test("getLightClientAddress()", () => {
    const chainId = 80001
    const chainStage = ChainStage.TESTNET
    const lc = getLightClientAddress(chainId, chainStage)
    expect(lc).toEqual(LIGHT_CLIENT[chainStage][ChainKey.MUMBAI])
  })

  test("getGatewayContract()", () => {
    const chainId = 80001
    const chainStage = ChainStage.TESTNET
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URI)
    const gateway = getGatewayContract(chainId, chainStage, provider)
    expect(gateway.address).toEqual(GATEWAY[chainStage][ChainKey.MUMBAI])
  })
})
