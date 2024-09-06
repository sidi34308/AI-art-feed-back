// app/api/images/route.js

import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY_PEXELS; // Replace with your Pexels API key
const IMAGES_PER_PAGE = 10;
async function translatePrompt(prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(
        "https://libretranslate.de/translate",
        {
          q: prompt,
          source: "ar",
          target: "en",
          format: "text",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.translatedText;
    } catch (error) {
      if (i === retries - 1) {
        // Final attempt failed, throw an error
        console.error("Translation failed after retries:", error);
        throw new Error("Translation failed after multiple attempts.");
      }
      // Wait before retrying (exponential backoff)
      await new Promise((res) => setTimeout(res, 1000 * Math.pow(2, i)));
    }
  }
}

export async function POST(request) {
  try {
    const { prompt, page } = await request.json();

    // Validate input
    if (!prompt || prompt.trim() === "") {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 }
      );
    }

    // Detect Arabic input and translate if needed
    const arabicRegex = /[\u0600-\u06FF]/; // Regex to detect Arabic characters
    let finalPrompt = prompt;

    if (arabicRegex.test(prompt)) {
      finalPrompt = await translatePrompt(prompt); // Translate if Arabic
      console.log("Translated prompt:", finalPrompt);
    }

    // Fetch images using the translated (or original) prompt
    const images = await fetchImagesFromPexels(finalPrompt, page);

    // Handle no images found
    if (!images || images.length === 0) {
      return NextResponse.json({ message: "No images found" }, { status: 404 });
    }

    // Return images
    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { message: "Error fetching images" },
      { status: 500 }
    );
  }
}
// Function to fetch images from Pexels
async function fetchImagesFromPexels(prompt, page = 1) {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: { query: prompt, per_page: IMAGES_PER_PAGE, page },
      headers: { Authorization: API_KEY },
    });

    return response.data.photos; // Return the photos array
  } catch (error) {
    console.error("Error fetching from Pexels:", error);
    throw error;
  }
}
