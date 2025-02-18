import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";

const budget = zodToJsonSchema(
  z.object({
    budget: z
      .number()
      .describe(
        "Extracted budget value from the user's query, ignoring currency."
      ),
    error: z
      .string()
      .optional()
      .describe("Error message if no budget is found in the query."),
  })
);

export type BudgetOutput = {
    budget: number;
    error: string;
  };
  
const budgetFunction = {
  name: "budget",
  description:
    "Extracts the numerical budget from the user's query, ignoring currency symbols.",
  parameters: budget,
};

const budgetFinderPrompt = ChatPromptTemplate.fromTemplate(
  `
  You are a budget extraction assistant that extracts only the numerical budget from the user's query, ignoring any currency symbols.
  
  If the user does not mention a budget, return an error message.
  
  Examples:

  1. User: "I want a phone under $500"  
     Output: "budget": 500

  2. User: "Looking for a laptop within 7000 rupees"  
     Output: "budget": 7000

  3. User: "Can you show me watches below 300?"  
     Output: "budget": 300

  4. User: "I need an affordable TV"  
     Output: "error": "User has not specified any budget"

  Now, extract the budget from the following query:

  User query: {query}
  `
);

const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
}).withStructuredOutput(budgetFunction);

export const budgetFinder = budgetFinderPrompt.pipe(model);
