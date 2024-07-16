// components/IdeaPage.js

"use client";
import { useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/public/ARTIST_S_AI.json";

const IdeaPage = () => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchIdea = async () => {
    setLoading(true);
    const prompt =
      "Generate one drawing idea, short in one sentence in arabic, make sure it is for a meaningful drawing or painting";

    const response = await fetch("/api/idea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();
    setIdea(result.idea);
    setLoading(false);
  };

  return (
    <main className="w-full  relative flex min-h-screen flex-col items-center justify-between p-24 rtl">
      <section className="w-full flex gap-6 flex-col md:flex-row">
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col justify-center items-center p-8 bg-zinc-9200 rounded-[15px]  border-zinc-700">
            <div className="flex flex-col justify-between items-center gap-6">
              <h2 className="font-bold text-xl">
                توليد فكرة لوحة باستخدام الذكاء الاصطناعي
              </h2>
              <button
                className="animate-bounce py-2 px-5 flex gap-2 items-center gap-1 bg-zinc-300 rounded-[7px] text-black font-bold hover:bg-zinc-400 h-auto"
                onClick={fetchIdea}
              >
                <h4 className="">اقترح علي فكرة</h4>
                <img src="/stars.png" className="w-5 " />
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
        </div>
        <div className="w-full">
          <div className="p-5 bg-zinc-9200 rounded-[15px]  border-zinc-700"></div>
        </div>
      </section>
    </main>
  );
};

export default IdeaPage;
