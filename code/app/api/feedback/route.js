// pages/api/feedback.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Result } from "postcss";
const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const prompt =
  "Give feedback on the following image of painting or drawing, mention what can be improved, as a paragraph, write in Arabic";

export async function POST(req, res) {
  try {
    const { tags, imagePart } = await req.json();

    // console.log(tags, imagePart);
    const result = await model.generateContent([
      { text: prompt },
      { text: tags },
      imagePart,
    ]);
    const text = result.response.text();

    // Example usage with Google Generative AI (replace with actual implementation)
    // const aiFeedback = await generateFeedback(prompt);
    return new Response(JSON.stringify({ feedback: text }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return new Response(JSON.stringify({ message: "Error fetching" }), {
      status: 500,
    });
  }
}

async function generateFeedback(image, prompt) {
  // Replace with actual logic using Google Generative AI or any other service
  // Example: const ai = new GoogleGenerativeAI();
  // const response = await ai.generateFeedback(image, prompt);
  // return response.feedback;
  return "Example AI-generated feedback";
}
