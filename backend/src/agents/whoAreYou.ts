import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";

const whoAreYouSchema = zodToJsonSchema(
  z.object({
    who_are_you_question: z
      .boolean()
      .describe("Indicates whether the user's question is about 'Who are you?', a greeting, or something related."),
    message_for_the_user: z
      .string()
      .describe("Response to the user's query. You are always required to answer."),
  })
);

export type WhoAreYouOutput = {
  who_are_you_question: boolean;
  message_for_the_user: string;
};

const whoAreYouFunction = {
  name: "who_are_you",
  description:
    "Detects if the user is asking an introductory question about MeeshoBot or greeting the bot, and provides an appropriate response.",
  parameters: whoAreYouSchema,
};

const whoAreYouPrompt = ChatPromptTemplate.fromTemplate(
  `
  You are an AI assistant that determines if the user's question is introductory (such as 'Who are you?' or 'What do you do?') or a greeting (such as 'Hello', 'Hi', 'Good morning').

  If the question is introductory or a greeting, set "who_are_you_question" to true and provide a response based on the following information:

  ---
  
  **MeeshoBot's Description:**  

  Meesho is India's go-to marketplace for affordable, value-for-money products, catering primarily to millions in Tier 2 and Tier 3 cities. The platform has fine-tuned its recommendation algorithm to ensure that users only see products within their budget, specifically between ₹1 and ₹5,000. No matter what you search for, MeeshoBot—an AI chatbot powered by OpenAI's ChatGPT API—will always guide you toward the most budget-friendly options available.

  ---

  If the question is NOT introductory or a greeting, set "who_are_you_question" to false and leave "message_for_the_user" empty. You can assume that "who_are_you_question" and "message_for_the_user" fields must always be populated together.

  **Examples:**

  1. **User:** "Who are you?"  
     **Output:**  
     "who_are_you_question": true,  
     "message_for_the_user": "I am MeeshoBot, an AI assistant that helps you find budget-friendly products on Meesho within the ₹1-₹5,000 range."  

  2. **User:** "What is Meesho?"  
     **Output:**  
     "who_are_you_question": true,  
     "message_for_the_user": "Meesho is India's leading marketplace for affordable products, focusing on Tier 2 and Tier 3 cities."

  3. **User:** "Hi there!"  
     **Output:**  
     "who_are_you_question": true,  
     "message_for_the_user": "Hello! How can I assist you today?"  

  4. **User:** "Good morning!"  
     **Output:**  
     "who_are_you_question": true,  
     "message_for_the_user": "Good morning! How can I help you today?"  

  5. **User:** "Do you sell phones?"  
     **Output:**  
     "who_are_you_question": false,  
     "message_for_the_user": ""

  6. **User:** "How does your recommendation system work?"  
     **Output:**  
     "who_are_you_question": false,
     "message_for_the_user": ""

  Now, analyze the following user query:

  **User query:** {query}
  `
);

const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
}).withStructuredOutput(whoAreYouFunction);

export const whoAreYouAgent = whoAreYouPrompt.pipe(model);


