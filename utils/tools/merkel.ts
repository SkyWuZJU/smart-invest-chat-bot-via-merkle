import { z } from "zod";
import { Tool, tool } from "@langchain/core/tools";

const adderSchema = z.object({
  pair: z.string().describe("The trading pair, e.g.'BTC_USD'"),
  userAddress: z.string().describe("The wallet address"),
  sizeDelta: z.bigint(),
  isLong: z.boolean().describe("Long or short the token"),
  isIncrease: z.boolean(),
  stopLossTriggerPrice: z.bigint(),
  takeProfitTriggerPrice: z.bigint(),
  canExecuteAbovePrice: z.boolean(),
});

export const merkleTool = tool(
  async (input): Promise<string> => {
    return 'The api response';
  },
  {
    name: "trade on merkle trade",
    description: "Place an order on Merkle Trade platform to long or short crypto currencies",
    schema: adderSchema,
  }
);