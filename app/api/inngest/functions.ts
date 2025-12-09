import prisma from "@/lib/prisma";
import {inngest} from "./client"
import {createGoogleGenerativeAI} from "@ai-sdk/google"
import { createMistral } from '@ai-sdk/mistral';
import { createGroq } from '@ai-sdk/groq';
import {generateText} from "ai"

const mistral = createMistral({apiKey: process.env.MISTRAL_API_KEY!})
const groq = createGroq({apiKey: process.env.GROQ_API_KEY!});

const google = createGoogleGenerativeAI({apiKey: process.env.GOOGLE_GENERATIVE_API_KEY!})
export const exceute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("Sleef for 5 seconds", 5000);
    const {steps: geminiSteps} = await step.ai.wrap("gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash-lite"),
        system: "You are a helpful assistant that helps to automate workflows.",
        prompt: "What is 2 + 2?",
      }
    );
    const {steps: mistralSteps} = await step.ai.wrap("mistral-generate-text",
      generateText,
      {
        model: mistral("ministral-8b-latest"),
        system: "You are a helpful assistant that helps to automate workflows.",
        prompt: "What is 2 + 2?",
      }
    );
    const {steps: groqSteps} = await step.ai.wrap("groq-generate-text",
      generateText,
      {
        model: groq("llama-3.3-70b-versatile"),
        system: "You are a helpful assistant that helps to automate workflows.",
        prompt: "What is 2 + 2?",
      }
    );
    return {
      geminiSteps,
      mistralSteps,
      groqSteps
    } 
  },
);
