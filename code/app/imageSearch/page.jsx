"use client";
import { useState } from "react";

const ImagesPage = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async () => {
    try {
      const responses = await Promise.all([
        fetch("/api/images/source1", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }),
        fetch("/api/images/source2", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }),
        fetch("/api/images/source3", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }),
      ]);

      const results = await Promise.all(responses.map((res) => res.json()));
      const combinedImages = results.flatMap((result) => result.images);
      setImages(combinedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Error fetching images. Please try again.");
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedImage;
    link.download = "downloaded_image.jpg"; // or use a dynamic name based on the image source
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
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
          className="w-full bg-gray-700 text-white p-4 rounded-lg mb-4"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          بحث
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Reference ${index}`}
            className="rounded-lg cursor-pointer"
            onClick={() => handleImageClick(image)}
          />
        ))}
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
