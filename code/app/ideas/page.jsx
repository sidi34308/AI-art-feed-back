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

    try {
      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch idea");
      }

      const result = await response.json();

      if (result.idea) {
        displayIdea(result.idea);
      } else {
        console.error("No idea returned in the response");
      }
    } catch (error) {
      console.error("Error fetching idea:", error);
    }

    setLoading(false);
  };

  const displayIdea = (text) => {
    if (!text) return;

    let index = 0;
    setIdea(""); // Reset idea before displaying new one
    const interval = setInterval(() => {
      setIdea((prev) => prev + text[index - 1]);
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval duration as needed
  };

  return (
    <section className="rtl w-full flex flex-col justify-center items-center h-screen bg-black text-white p-8">
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col justify-center items-center gap-6">
          <h2 className="font-bold text-2xl text-center mb-4">
            توليد فكرة لوحة باستخدام الذكاء الاصطناعي
          </h2>
          <button
            className="animate-bounce py-3 px-6 flex gap-2 items-center bg-blue-500 rounded-lg text-white font-bold hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={fetchIdea}
          >
            <h4 className="">اقترح علي فكرة</h4>
            <img src="/stars.png" className="w-6" />
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center mt-6">
            <img src="/loader.svg" alt="Loading..." className="w-16" />
          </div>
        ) : (
          <div className="mt-6 bg-[#181818] p-4 rounded-xl">
            <p className="text-lg text-center">{idea}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default IdeaPage;
