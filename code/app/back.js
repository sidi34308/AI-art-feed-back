"use client";

import {
  GoogleGenerativeAI,

} from "@google/generative-ai";
import { useState } from "react";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
console.log(API_KEY);


export default function Home() {
  const [data, setData] = useState("");

  async function runChat(prompt) {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const chat = model.startChat({

        history: [
          {
            role: "user",
            parts: [{ text: "HELLO" }],
          },
          {
            role: "model",
            parts: [{ text: "Hello there! How can I assist you today?" }],
          },
        ],
      });

      const result = await chat.sendMessage([{ text: prompt }]);
      const response = result.response;
      console.log(response.text);
      setData(response.text);
    } catch (err) {
      console.error("Error while fetching idea:", err);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const prompt = event.target.prompt.value || "";
    runChat(prompt);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form onSubmit={onSubmit} className="">
        <p className="mb-2">Enter your prompt here</p>
        <input
          type="text"
          placeholder="Enter your prompt here"
          name="prompt"
          className="border-none outline-none p-4 rounded-lg text-black"
        />{" "}
        <br />
        <button
          type="submit"
          className="bg-white border border-none outline-none p-4 rounded-lg text-black font-bold uppercase mt-2"
        >
          Submit
        </button>
      </form>
      {data && (
        <div>
          <h1 className="mt-32">Output</h1>
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </div>
      )}
      <section className="flex h-screen mt-10 w-full bg-green-200 items-center justify-center p-6">
        <div className="grid h-full w-full grid-cols-10 rows-4 gap-4">
          <div className="row-span-4 col-span-3 bg-white p-2"></div>
          <div className="row-span-2 col-span-4 bg-white p-2"></div>
          <div className="row-span- col-span- bg-white p-2"></div>
          <div className="row-span- col-span- bg-white p-2"></div>
        </div>
      </section>
    </main>
  );
}