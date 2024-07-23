// app/api/images/route.js

import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY_PEXELS; // Replace with your Pexels API key
const IMAGES_PER_PAGE = 10;

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const response = await fetchImagesFromPexels(prompt);

    if (!response) {
      return new Response(JSON.stringify({ message: "No images found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ images: response.photos }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return new Response(JSON.stringify({ message: "Error fetching images" }), {
      status: 500,
    });
  }
}

async function fetchImagesFromPexels(prompt) {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: { query: prompt, per_page: IMAGES_PER_PAGE },
      headers: { Authorization: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching from Pexels:", error);
    throw error;
  }
}
