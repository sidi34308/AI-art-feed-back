"use client";
import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver-es";

const ImagesPage = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/images", { prompt });
      setImages(response.data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Error fetching images. Please try again.");
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8 mt-20">
      <div className="max-w-2xl w-full mb-8">
        <h1 className="text-3xl font-bold mb-2">
          ابحث عن صور مرجعية <span className="text-blue-500">باستخدام AI</span>
        </h1>
        <p className="mb-6">احصل على صور مرجعية لأعمالك الفنية القادمة</p>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="ادخل وصفا للحصول على صور مرجعية"
          className="w-full border-[1px] border-[#323232] bg-[#242424] text-white p-4 rounded-2xl mb-4"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-[#3753ba] text-white py-2 rounded-2xl hover:bg-[#22357a]"
        >
          بحث
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <img src="/loader.svg" alt="Loading..." className="w-20" />
        ) : (
          images.map((image) => (
            <img
              key={image.id}
              src={image.src.large2x}
              alt={image.alt}
              className="rounded-lg cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
          ))
        )}
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-gray-800 p-4 rounded-lg">
            <button
              className="absolute top-2 right-2 text-white"
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
              تنزيل
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesPage;
