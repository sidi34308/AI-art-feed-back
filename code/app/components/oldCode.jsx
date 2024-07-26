"use client";

import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import FeedBack from "./components/feedBack";
import Search from "./components/search";

import Lottie from "lottie-react";
import animationData from "@/public/ARTIST_S_AI.json";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
console.log(API_KEY);

export default function Home() {
  const [count, setCount] = useState(0);
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);

  const incrementCount = async () => {
    await fetchIdea();
  };

  async function fetchIdea() {
    setLoading(true);
    const prompt =
      "Generate one drawing idea, short in one sentence in arabic,make sure it is for a meaningful drawing or painting";
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const result = await model.generateContent([{ text: prompt }]);
      const text = result.response.text();

      console.log(text);

      setIdea(text);
      await lookforKeyWords(text);
    } catch (err) {
      console.error("Error while fetching idea:", err);
    } finally {
      setLoading(false);
    }
  }

  async function lookforKeyWords(ideas) {
    const prompt =
      "from this idea text give me only list of key words that can be searched for reference images separated by , sign and no space between keywords, make sure the key words are in english do not add key words like, limit the key words to 8";
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const result = await model.generateContent([
        { text: prompt },
        { text: ideas },
      ]);
      const text = result.response.text();
      const array = text.split(",");

      console.log(array);
      setKeywords(array);
    } catch (err) {
      console.error("Error while fetching keywords:", err);
    }
  }

  return (
    <main className="w-full  relative flex min-h-screen flex-col items-center justify-between p-24 ">
      <section className="w-full flex gap-6 flex-col md:flex-row">
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col justify-center items-center p-8 bg-zinc-9200 rounded-[15px] border border-zinc-700">
            <div className="flex flex-col justify-between items-center gap-6">
              <h2 className="font-bold text-xl">
                توليد فكرة لوحة باستخدام الذكاء الاصطناعي
              </h2>
              <button
                className="animate-bounce py-2 px-5 flex items-center gap-1 bg-zinc-300 rounded-[7px] text-black font-bold hover:bg-zinc-400 h-auto"
                onClick={incrementCount}
              >
                <h4 className="w-36">اقترح علي فكرة</h4>
                <img src="/stars.png" className="w-5 p02" />
              </button>
            </div>
            {loading ? (
              <img
                src="/loader.svg"
                alt="Loading..."
                className="w-20 justify-center"
              />
            ) : (
              <div className="p-4">{idea}</div>
            )}
          </div>
          <div className=" p-8 bg-zinc-9200 rounded-[15px] border border-zinc-700 h-full">
            <div className="max-w-xl ">
              <Lottie
                animationData={animationData}
                className=" absolute bottom-[0] left-[0rem] z-[0]"
                loop={true}
              />

              <FeedBack />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="p-5 bg-zinc-9200 rounded-[15px] border border-zinc-700">
            <div className="flex flex-col justify-between items-center gap-6">
              <Search list={keywords} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
