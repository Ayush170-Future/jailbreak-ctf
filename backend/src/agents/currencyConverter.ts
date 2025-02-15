import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";

const currencySchema = zodToJsonSchema(
  z.object({
    detected_currency: z
      .string()
      .describe("Detected currency from the user query (e.g., INR, USD, EUR, GBP). Defaults to INR if not specified."),
    converted_budget_inr: z
      .number()
      .describe("Approximate budget converted to INR using general knowledge."),
  })
);

const currencyConversionFunction = {
  name: "currency_detection",
  description:
    "Detects the currency from the user's query and converts the provided budget into INR approximately.",
  parameters: currencySchema,
};

const currencyPrompt = ChatPromptTemplate.fromTemplate(
  `
  You are an intelligent assistant responsible for detecting currency from a user query 
  and converting the given budget into Indian Rupees (INR).

  - If no currency is mentioned, assume it is in INR.
  - If a currency is mentioned (like USD, EUR, GBP), estimate its INR equivalent.
  - You don't need perfect accuracy, just provide a reasonable approximation.

  Example Conversions:
  - 1 USD ≈ 83 INR
  - 1 EUR ≈ 90 INR
  - 1 GBP ≈ 105 INR
  - 1 JPY ≈ 0.56 INR

  Now, process the user query and convert the given budget:

  User query: {query}
  Budget: {budget}
  `
);

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
}).withStructuredOutput(currencyConversionFunction);

export const currencyConverter = currencyPrompt.pipe(model);
