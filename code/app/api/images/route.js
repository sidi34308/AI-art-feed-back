// app/api/images/route.js

import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY_PEXELS; // Replace with your Pexels API key
const IMAGES_PER_PAGE = 10;

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

    // Fetch images from Pexels
    const images = await fetchImagesFromPexels(prompt, page);

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
