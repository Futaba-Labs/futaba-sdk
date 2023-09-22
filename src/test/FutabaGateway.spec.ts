import { describe, test } from 'vitest'

describe("FutabaGateway", () => {
  if (process.env.PROVIDER_URL === undefined) {
    throw new Error('PROVIDER_URI not set');
  }

  test("constructor() - No chainId", () => { })
  test("constructor() - If option is not entered", () => { })
  test("constructor() - If option is entered", () => { })
  test("estimateFee() - querySize must be positive", () => { })
  test("estimateFee() - Too many queries", () => { })
  test("estimateFee()", () => { })
})