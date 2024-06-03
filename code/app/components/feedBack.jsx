"use client";
import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Feedback = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  const fileInputRef = useRef(null);

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  }, [file]);

  const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const fetchDataProVision = async () => {
    if (!file) {
      alert("Please select an image and describe it");
      return;
    }
    setResponse(null);
    setLoading(true);
    setError("");

    const prompt = "Give a feedback on the following image of painting or drawing, say what can be improved, as a paragraph, write in arabic";

    try {
      const imagePart = await fileToGenerativePart(file);
      const result = await model.generateContent([{ text: prompt }, { text: description }, imagePart]);
      const text = result.response.text();
      setLoading(false);
      setResponse(text);
      console.log(text);
      setDescription("");
    } catch (error) {
      setLoading(false);
      setError(`An error occurred: ${error.message}`);
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Please select a valid image file");
      event.target.value = null;
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Please select a valid image file");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center p-2">
      <h1 className="font-bold text-xl"> احصل على ردود الفعل على الرسم الخاص بك</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <button
        onClick={handleClick}
        className="bg-[#CEA333] hover:bg-[#aa8425] text-white px-5 py-2 rounded-xl"
      >
        اختر صورة
      </button>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-dashed border-2 border-gray-300 p-4 mb-4 w-full flex justify-center items-center"
      >
        {preview ? (
          <img src={preview} alt="Image preview" className="max-w-full h-auto" />
        ) : (
          <p className="text-gray-400">قم بسحب وإسقاط الصورة هنا، أو انقر لتحديد واحدة</p>
        )}
      </div>

      <button
        onClick={fetchDataProVision}
        className="bg-[#CEA333] w-full hover:bg-[#aa8425] text-white px-5 py-2 rounded-xl"
      >
        ما هو تعليقك
      </button>
      {loading && <img src="/loader.svg" alt="Loading..." className="mt-4" />}
      {response && (
        <div className="mt-4">
          <h2></h2>
          <div>{response}</div>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Feedback;
