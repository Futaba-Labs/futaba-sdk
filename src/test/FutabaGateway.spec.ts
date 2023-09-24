import { beforeEach, describe, expect, test } from 'vitest'
import { ChainKey, ChainStage, LIGHT_CLIENT, RPCS } from '../constants';
import { FutabaGateway } from '../FutabaGateway';
import { ethers } from 'ethers';
import { QueryRequest } from '../utils';
import { CALLBACK, MESSAGE, getQueryRequest } from './utils/queryRequest';

describe("FutabaGateway", () => {
  let providerURL: string,
    privateKey: string

  if (process.env.PROVIDER_URL === undefined) {
    throw new Error('PROVIDER_URI not set');
  } else {
    providerURL = process.env.PROVIDER_URL
  }

  if (process.env.PRIVATE_KEY === undefined) {
    throw new Error('PRIVATE_KEY not set');
  } else {
    privateKey = process.env.PRIVATE_KEY
  }

  describe("constructor", () => {
    test("constructor() - No chainId", () => {
      const invalidChainId = 0
      const chainStage = ChainStage.MAINNET
      // @ts-ignore
      expect(() => new FutabaGateway(invalidChainId, chainStage)).toThrowError("No ChainKey for 0")
    })

    test("constructor() - If option is not entered", () => {
      const chainId = 80001
      const chainStage = ChainStage.TESTNET
      const wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(providerURL))
      const gateway = new FutabaGateway(chainStage, chainId, wallet)

      expect(gateway.chainId).toEqual(chainId)
      expect(gateway.stage).toEqual(chainStage)
      expect(gateway.provider).toEqual(wallet)
      // equal to "0xA171Ec7644385e3dcc5A68af62E6c317f210c7b9"
      expect(gateway.lightClient).toEqual(LIGHT_CLIENT[chainStage][ChainKey.MUMBAI])
    })

    test("constructor() - If option is entered", () => {
      const chainId = 80001
      const chainStage = ChainStage.TESTNET
      const lightClient = "0x3fab87824ABbe2DC686ed5CbB032d9c62E2fe179"
      const wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(providerURL))
      const gateway = new FutabaGateway(chainStage, chainId, wallet, lightClient)

      expect(gateway.chainId).toEqual(chainId)
      expect(gateway.stage).toEqual(chainStage)
      expect(gateway.provider).toEqual(wallet)
      expect(gateway.lightClient).toEqual(lightClient)
    })
  })

  describe("functions", () => {
    let gateway: FutabaGateway

    beforeEach(() => {
      const chainId = 80001
      const chainStage = ChainStage.TESTNET
      const providerURL = process.env.PROVIDER_URL
      const wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(providerURL))
      gateway = new FutabaGateway(chainStage, chainId, wallet)
    })

    test("sendQuery() - Too many queries", async () => {
      const queries: QueryRequest[] = []
      const callBack = CALLBACK
      const message = MESSAGE
      const gasLimit = ethers.BigNumber.from("1000000")
      queries.push(...Array(11).fill(getQueryRequest()))
      // @ts-ignore
      await expect(() => gateway.sendQuery(queries, callBack, message, gasLimit)).rejects.toThrowError("Too many queries")
    })

    // test("sendQuery()", async () => {
    //   const queries: QueryRequest[] = [getQueryRequest()]
    //   const callBack = CALLBACK
    //   const message = MESSAGE
    //   const gasLimit = ethers.BigNumber.from("1000000")
    //   queries.push(getQueryRequest())
    //   // @ts-ignore
    //   const { tx, queryId } = await gateway.sendQuery(queries, callBack, message, gasLimit)
    //   expect(tx.status).toEqual(1)
    // })

    test("getCache()", async () => {
      const queries: QueryRequest[] = [getQueryRequest()]
      const cache = await gateway.getCache(queries)
      expect(cache.length).toEqual(1)
    })

    test("getQueryStatus()", async () => {
      const queryId = "0x0398f0cde785effe66fb416ccb7915ce2a63c83213ea088c6a546a32b26c40b4"
      const status = await gateway.getQueryStatus(queryId)
      expect(status).toEqual(1)
    })
  })
})
