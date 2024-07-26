"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { saveAs } from "file-saver-es";
import FootBar from "../components/FooterBar";
import Header from "../components/Header";

const ImagesPage = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (prompt, page) => {
    if (!prompt || prompt.trim() === "") {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/images", { prompt, page });
      if (response.data.images.length === 0) {
        setHasMore(false);
      } else {
        setImages((prevImages) => [...prevImages, ...response.data.images]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Error fetching images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setImages([]);
    setPage(1);
    setHasMore(true);
    fetchImages(prompt, 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image.src.large2x); // Adjust based on the structure of the image object
  };

  const handleDownload = () => {
    if (selectedImage) {
      fetch(selectedImage)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, "downloaded_image.jpg"); // Use a dynamic name if needed
        })
        .catch((error) => {
          console.error("Error downloading image:", error);
          alert("Failed to download image.");
        });
    } else {
      alert("No image selected for download");
    }
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    if (prompt && page > 1) {
      fetchImages(prompt, page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8 mt-20">
      <Header />
      <div className="max-w-2xl w-full mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Search for Reference Images{" "}
          <span className="text-blue-500">Using AI</span>
        </h1>

        <p className="mb-6">Get reference images for your upcoming artwork.</p>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a description to get reference images"
          className="w-full border-[1px] border-[#323232] bg-[#242424] text-white p-4 rounded-2xl mb-4"
        />

        <button
          onClick={handleSearch}
          className="w-full bg-[#3753ba] text-white py-2 rounded-2xl hover:bg-[#22357a]"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative">
            <img
              src={image.src.large2x}
              alt={image.alt}
              className="w-full h-auto rounded-lg cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </div>
      {loading && (
        <div className="col-span-full flex justify-center items-center">
          <img src="/loader.svg" alt="Loading..." className="w-20" />
        </div>
      )}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black p-4 rounded-lg">
            <button
              className="absolute top-2 right-2 text-white bg-red-800 py-2 px-4 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-[80vh] mb-4 rounded-lg"
            />
            <button
              onClick={handleDownload}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Download
            </button>
          </div>
        </div>
      )}
      <FootBar />
    </div>
  );
};

export default ImagesPage;
