import * as GATEWAY_ABI from './gateway.abi.json';

// enum
export { ChainId } from './ChainId'
export { ChainKey } from './ChainKey'
export { ChainStage } from './ChainStage'

// ABI
export { GATEWAY_ABI }

// constants
export * from './deployments'
export * from './rpcs'

// others
export const NATIVE_TOKEN = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
export const BASE_QUERY_COST = 100000
