import { BigNumber, ethers } from "ethers";
import { keccak256, concat, hexZeroPad } from "ethers/lib/utils";
import { MESSAGE } from "../src/test/utils/queryRequest";
import { QueryRequest } from "../src/utils"
import { ChainId, ChainStage, FutabaGateway, FutabaQueryAPI } from "../src";
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const slot = keccak256(concat([
    hexZeroPad("0x2274d2C66dC7936044f7B46b7401c3F5187B78aa", 32),
    hexZeroPad(BigNumber.from(0).toHexString(), 32),
  ]));

  console.log("slot: ", slot)

  const usdcOnGoerli = "0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43" // USDC on Goerli
  const linkOnOpGoerli = "0x14cd1A7b8c547bD4A2f531ba1BF11B6c4f2b96db" // LINK on Optimism Goerli
  const callBack = "0x593983D05B6E3240A69160FEfaC44d84068e208A" // Mock Receiver

  const message = MESSAGE

  const providerURL = process.env.PROVIDER_URL
  const privateKey = process.env.PRIVATE_KEY || ""
  const wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(providerURL))
  const queryAPI = new FutabaQueryAPI(ChainStage.DEVNET, ChainId.MUMBAI)
  const gateway = new FutabaGateway(ChainStage.DEVNET, ChainId.MUMBAI, wallet)

  const queries: QueryRequest[] = [
    {
      dstChainId: 5, to: usdcOnGoerli, height:
        8947370, slot
    },
    {
      dstChainId: 420, to: linkOnOpGoerli, height:
        9844421, slot
    },
  ]
  console.log("Estimating gas...")
  const gas = await queryAPI.estimateFee(queries)
  console.log("Estimated gas: ", gas.toString())

  console.log("Sending query...")
  // @ts-ignore
  const { tx, queryId } = await gateway.sendQuery(queries, callBack, message, BigNumber.from("1000000"))
  console.log("Query is sent, tx: ", tx.transactionHash)

  console.log("Waiting for query result...")
  const { response, results } = await gateway.waitForQueryResult(queryId)
  console.log("Query result is received!!")
  console.log("response tx hash: ", response.hash)
  console.log("results: ", JSON.stringify(results))
  process.exit(0)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
