import { beforeEach, describe, expect, test } from 'vitest'
import { FutabaQueryAPI } from '../FutabaQueryAPI';
import { ChainKey, ChainStage, LIGHT_CLIENT, NATIVE_TOKEN, RPCS } from '../constants';
import { QueryRequest } from '../utils';
import { BigNumber } from 'ethers';
import { getQueryRequest } from './utils/queryRequest';

describe("FutabaQueryAPI", () => {
  describe("constructor()", () => {
    test("constructor() - No chainId", () => {
      const invalidChainId = 0
      const chainStage = ChainStage.MAINNET
      // @ts-ignore
      expect(() => new FutabaQueryAPI(invalidChainId, chainStage)).toThrowError("No ChainKey for 0")
    })

    test("constructor() - If option is not entered", () => {
      const chainId = 80001
      const chainStage = ChainStage.TESTNET
      const queryAPI = new FutabaQueryAPI(chainStage, chainId)

      expect(queryAPI.chainId).toEqual(chainId)
      expect(queryAPI.stage).toEqual(chainStage)
      // equal to  "https://rpc-mumbai.maticvigil.com"
      expect(queryAPI.provider.connection.url).toEqual(RPCS[chainStage][ChainKey.MUMBAI])
      // equal to "0xA171Ec7644385e3dcc5A68af62E6c317f210c7b9"
      expect(queryAPI.lightClient).toEqual(LIGHT_CLIENT[chainStage][ChainKey.MUMBAI])
    })

    test("constructor() - If option is entered", () => {
      const chainId = 80001
      const chainStage = ChainStage.TESTNET
      const rpc = "http://localhost:8545"
      const lightClient = "0x3fab87824ABbe2DC686ed5CbB032d9c62E2fe179"
      const queryAPI = new FutabaQueryAPI(chainStage, chainId, { rpc, lightClient })

      expect(queryAPI.chainId).toEqual(chainId)
      expect(queryAPI.stage).toEqual(chainStage)
      expect(queryAPI.provider.connection.url).toEqual(rpc)
      expect(queryAPI.lightClient).toEqual(lightClient)
    })
  })

  describe("functions", () => {
    if (process.env.PROVIDER_URL === undefined) {
      throw new Error('PROVIDER_URI not set');
    }

    let queryAPI: FutabaQueryAPI

    beforeEach(() => {
      const chainId = 80001
      const chainStage = ChainStage.TESTNET
      queryAPI = new FutabaQueryAPI(chainStage, chainId, { rpc: process.env.PROVIDER_URL })
    })

    test("estimateFee() - querySize must be positive", async () => {
      const queries: QueryRequest[] = []
      const gasLimit = BigNumber.from("1000000")
      await expect(() => queryAPI.estimateFee(queries, gasLimit)).rejects.toThrowError("querySize must be positive")
    })

    test("estimateFee() - Too many queries", async () => {
      const queries: QueryRequest[] = []
      for (let i = 0; i < 15; i++) {
        queries.push(getQueryRequest())
      }
      const gasLimit = BigNumber.from("1000000")
      await expect(() => queryAPI.estimateFee(queries, gasLimit)).rejects.toThrowError("Too many queries")
    })

    test("estimateFee()", async () => {
      const queries: QueryRequest[] = [getQueryRequest()]
      const gasLimit = BigNumber.from("1000000")

      const fee = await queryAPI.estimateFee(queries, gasLimit)
      expect(fee).toBeDefined();
    })
  })
})
