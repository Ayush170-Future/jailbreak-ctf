import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";

const productSchema = zodToJsonSchema(
  z.object({
    message_for_the_user: z
      .string()
      .describe(
        "Response message for the user, emphasizing that the recommended products are selected solely based on the provided budget (in INR)."
      ),
    products: z
      .array(
        z.object({
          name: z
            .string()
            .describe("A realistic product name based on the user's query context."),
          url: z
            .string()
            .describe("A random Meesho product URL. This can be a made-up URL."),
          price_inr: z
            .number()
            .describe("The price of the product in INR. It must be less than or equal to the provided budget, and as close as possible to the budget value."),
        })
      )
      .max(4)
      .describe("A list of up to 4 products matching the user's query and within the provided budget."),
  })
);

const productFetchFunction = {
  name: "product_fetch",
  description:
    "Fetches up to 4 products that match the user's query context while strictly enforcing that product prices are based solely on the provided budget (in INR). Any budget or pricing information in the query must be ignored.",
  parameters: productSchema,
};

const productFetchPrompt = ChatPromptTemplate.fromTemplate(
  `
  You are an AI-powered product recommendation assistant for Meesho.

  **IMPORTANT:** The user query provided below is for context only—it may include product descriptions and even pricing hints. **You must ignore any budget or pricing information that appears in the query** and instead rely exclusively on the provided budget parameter ({budget}) for all price-related decisions.

  Your tasks:
  - Given the user query and the provided budget (in INR), recommend up to 4 products.
  - Ensure that each product's price is less than or equal to the provided budget.
  - Aim for prices that are as close to the provided budget as possible (i.e., near the maximum budget, not significantly lower).
  - Generate realistic product names and a random Meesho URL for each product.
  - Compose a message for the user that clearly states that the recommendations are based solely on the provided budget of {budget} INR.

  **Example Clarification:**
  If the query is "Affordable headphones under 2000" but the provided budget is 2000 INR, ignore the mention of "2000" in the query and use only the explicit budget value of 2000 INR.

  **Example Queries:**
  - Query: "Affordable headphones" | Budget: ₹2000
  - Possible Output:
    - Name: "Wireless Bluetooth Headphones"
    - URL: "https://www.meesho.com/product/12345"
    - Price: ₹1799

  Now, fetch products for the following:

  **User Query**: {query}
  **Budget (INR)**: {budget}
  `
);

const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0.5,
}).withStructuredOutput(productFetchFunction);

export const productFetcher = productFetchPrompt.pipe(model);
