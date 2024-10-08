"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import FootBar from "../components/FooterBar";
import Header from "../components/Header";
import { FaSearch } from "react-icons/fa";

const ImagesPage = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (prompt, page) => {
    if (!prompt || prompt.trim() === "") {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 }
      );
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
    setSelectedImage(image.src.large2x);
  };

  const handleDownload = () => {
    if (selectedImage) {
      fetch(selectedImage)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, "downloaded_image.jpg");
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
    <div className="flex flex-col items-center justify-start bg-black min-h-screen text-white p-8">
      <Header />
      <div className="max-w-2xl w-full mb-8 mt-40">
        <h1 className="text-3xl font-bold mb-2">
          Search for <span className="text-[#5b7cf5]">Reference Images</span>
        </h1>
        <p className="mb-6">Get reference images for your upcoming artwork.</p>
        <div className="px-4 flex items-center border-[1px] border-[#323232] bg-[#242424] rounded-2xl mb-4 p-">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a description to get reference images"
            dir={/[\u0600-\u06FF]/.test(prompt) ? "rtl" : "ltr"} // Detect Arabic characters
            className="w-full bg-transparent text-white p-4 rounded-2xl outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={!prompt.trim()}
          className="w-full bg-[#3753ba] text-white py-2 rounded-2xl hover:bg-[#22357a]"
          style={{ opacity: !prompt.trim() ? 0.5 : 1 }}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto">
        {images.map((image) => (
          <div key={image.id} className="relative">
            <img
              src={image.src.large2x}
              alt={image.alt}
              className="w-full h-full rounded-lg cursor-pointer object-cover"
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
              className="w-full bg-[#5b7cf5] text-white py-2 px-4 rounded-lg hover:bg-blue-600"
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
