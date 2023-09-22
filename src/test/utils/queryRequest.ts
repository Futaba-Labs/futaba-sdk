import { BigNumber } from "ethers";
import { keccak256, concat, hexZeroPad, toUtf8Bytes } from "ethers/lib/utils";

export const USDC_ON_GOERLI = "0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43" // USDC on Goerli
export const LINK_ON_GOERLI = "0x14cd1A7b8c547bD4A2f531ba1BF11B6c4f2b96db" // LINK on Optimism Goerli
export const CALLBACK = "0xda94E03f3c4C757bA2f1F7a58A00d2525569C75b" // Mock Receiver

export const MESSAGE = toUtf8Bytes("Hello, World!")

// storage slot of the token balance on the destination chain
export const BALANCE_SLOT = keccak256(concat([
  hexZeroPad("0x2274d2C66dC7936044f7B46b7401c3F5187B78aa", 32),
  hexZeroPad(BigNumber.from(0).toHexString(), 32),
]));

export const HEIGHT = 8947360
export const DST_CHANI_ID = 5

export const getQueryRequest = () => {
  return {
    dstChainId: DST_CHANI_ID, to: USDC_ON_GOERLI, height: HEIGHT, slot: BALANCE_SLOT
  }
}

