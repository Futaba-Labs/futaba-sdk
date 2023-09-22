import { describe, test } from 'vitest'

describe("FutabaQueryAPI", () => {
  if (process.env.PROVIDER_URL === undefined) {
    throw new Error('PROVIDER_URI not set');
  }

  test("constructor() - No chainId", () => { })
  test("constructor() - If option is not entered", () => { })
  test("constructor() - If option is entered", () => { })
  test("sendQuery() - Too many queries", () => { })
  test("sendQuery()", () => { })
  test("getCache()", () => { })
  test("getQueryStatus()", () => { })
})
