// pages/api/idea.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const result = await model.generateContent([{ text: prompt }]);
      const text = result.response.text();

      res.status(200).json({ idea: text });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error while fetching idea", details: err });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
