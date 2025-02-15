import dotenv from "dotenv";
dotenv.config();

import { Annotation, StateGraph, END, START } from "@langchain/langgraph";
import { budgetFinder } from "./agents/budgetFinder.js";
import { currencyConverter } from "./agents/currencyConverter.js";
import { productFetcher } from "./agents/productFetch.js";
import { whoAreYouAgent } from "./agents/whoAreYou.js"

const PlanExecuteState = Annotation.Root({
  query: Annotation<string>({
    reducer: (x, y) => y ?? x ?? "",
  }),
  budget: Annotation<number>({
    reducer: (x, y) => y ?? x ?? "",
  }),
  products: Annotation<string[]>({
    reducer: (x, y) => y ?? x ?? [],
  }),
  error: Annotation<string>({
    reducer: (x, y) => y ?? x,
  }),
  message_for_the_user: Annotation<string>({
    reducer: (x, y) => y ?? x,
  }),
  who_are_you_question: Annotation<boolean>({
    reducer: (x, y) => y ?? x,
  })
});

async function whoAreYouStep(state: typeof PlanExecuteState.State
): Promise<Partial<typeof PlanExecuteState.State>> {
  console.log("Who are you inside...");

  const input = { query: state.query };
  try {
    const output = await whoAreYouAgent.invoke(input);

    if (output.who_are_you_question == true) {
      return { message_for_the_user: output.message_for_the_user, who_are_you_question: true };
    } else {
        return { who_are_you_question: false }
    }
  } catch (err) {
    console.error(`Error: ${err}`);
    return { error: `Error: ${err}` };
  }
}

function gotoBudgetFinding(state: typeof PlanExecuteState.State) {
    if (state.who_are_you_question == true) return "true";
    return "false";
}

async function budgetFinderStep(
  state: typeof PlanExecuteState.State
): Promise<Partial<typeof PlanExecuteState.State>> {
  console.log("Budget Finder...");

  const input = { query: state.query };
  try {
    const output = await budgetFinder.invoke(input);

    if (output.error) {
      return { error: output.error };
    }

    if (!output.budget) {
      return { error: "Unable to detect Budget from the Query" };
    }

    return { budget: output.budget };
  } catch (err) {
    console.error(`Error: ${err}`);
    return { error: `Error: ${err}` };
  }
}

function detectError(state: typeof PlanExecuteState.State) {
  return state.error ? "true" : "false";
}

async function budgetValidation(
  state: typeof PlanExecuteState.State
): Promise<Partial<typeof PlanExecuteState.State>> {
  console.log("Budget validation...");

  if (!state.budget) {
    return { error: "Unable to detect Budget from the Query" };
  }

  const budget = state.budget;

  if (budget >= 1 && budget <= 5000) {
    return {};
  } else {
    return {
      error:
        "Meesho is committed to providing the most cost-effective products to millions across India. " +
        "You can only enter a budget between ₹1 and ₹5000 to ensure affordable shopping options.",
    };
  }
}

async function currencyConversionStep(
  state: typeof PlanExecuteState.State
): Promise<Partial<typeof PlanExecuteState.State>> {
  console.log("Currency Converter...");

  if (!state.budget) {
    return { error: "Unable to detect Budget from the Query" };
  }

  if (!state.query) {
    return { error: "Couldn't find User Query" };
  }

  try {
    const input = { query: state.query, budget: state.budget };
    const output = await currencyConverter.invoke(input);
    if (output.converted_budget_inr && output.detected_currency) {
      return { budget: output.converted_budget_inr };
    } else {
      return { error: "I'm unable to detect the Budget from the Query" };
    }
  } catch (error) {
    return {
      error:
        "Meesho is committed to providing the most cost-effective products to millions across India. " +
        "You can only enter a budget between ₹1 and ₹5000 to ensure affordable shopping options.",
    };
  }
}

async function productGenerateStep(
    state: typeof PlanExecuteState.State
  ): Promise<Partial<typeof PlanExecuteState.State>> {
    console.log("Product Fetch...");
  
    if (!state.query) {
      return { error: "User query is missing" };
    }
  
    if (!state.budget) {
      return { error: "Budget is required to fetch products" };
    }
  
    const input = {
      query: state.query,
      budget: state.budget,
    };
  
    try {
      const output = await productFetcher.invoke(input);
  
      if (!output.products || output.products.length === 0) {
        return { error: "No products found matching your query and budget" };
      }
  
      return { products: output.products, message_for_the_user: output.message_for_the_user };
    } catch (err) {
      console.error(`Error fetching products: ${err}`);
      return { error: `Error fetching products: ${err}` };
    }
  }
  
const workflow = new StateGraph({input: PlanExecuteState, output: PlanExecuteState})
  .addNode("whoAreYou", whoAreYouAgent)
  .addNode("budgetFinder", budgetFinderStep)
  .addNode("budgetValidation", budgetValidation)
  .addNode("productGenerate", productGenerateStep)
  .addNode("currencyConversion", currencyConversionStep)
  .addEdge(START, "whoAreYou")
  .addConditionalEdges("whoAreYou", gotoBudgetFinding, {
    true: END,
    false: "budgetFinder"
  })
  .addConditionalEdges("budgetFinder", detectError, {
    true: END,
    false: "budgetValidation",
  })
  .addConditionalEdges("budgetValidation", detectError, {
    true: END,
    false: "currencyConversion",
  })
  .addConditionalEdges("currencyConversion", detectError, {
    true: END,
    false: "productGenerate"
  })
  .addEdge("productGenerate", END)

export const app = workflow.compile();
