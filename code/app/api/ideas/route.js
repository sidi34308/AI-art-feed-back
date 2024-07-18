// pages/api/ideas.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent([{ text: prompt }]);
    const text = result.response.text(); // Ensure the text is properly accessed

    return new Response(JSON.stringify({ idea: text }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error fetching idea" }), {
      status: 500,
    });
  }
}
