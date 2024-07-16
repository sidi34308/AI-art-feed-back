// components/ImagesPage.js

"use client";
import { useState } from "react";

const ImagesPage = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    const response = await fetch("/api/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();
    setImages(result.idea.split(",")); // Assuming the API returns comma-separated image URLs
  };

  return (
    <div className="rtl min-h-screen flex items-center justify-center bg-black text-white p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2">
          ابحث عن صور مرجعية <span className="text-blue-500">باستخدام AI</span>
        </h1>
        <p className="mb-6">احصل على صور مرجعية لأعمالك الفنية القادمة</p>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="ادخل وصفا للحصول على صور مرجعية"
          className="w-full bg-gray-700 text-white p-4 rounded-lg mb-4"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          بحث
        </button>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Reference ${index}`}
              className="rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesPage;
