"use client";
import React, { useState, useEffect, useRef } from "react";

const FeedbackPage = () => {
  const [tags, setTags] = useState(["realistic", "Anime", "simple"]);
  const [feedback, setFeedback] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Added to store the actual file
  const [loading, setLoading] = useState(false);

  const availableTags = [
    "realistic",
    "Anime",
    "simple",
    "abstract",
    "portrait",
    "landscape",
    "modern",
    "classic",
  ];

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setSelectedImage("");
    }
  }, [imageFile]); // Change from 'file' to 'imageFile'

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

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

  const handleTagAdd = (newTag) => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setShowDropdown(false);
  };

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file));
  //     setImageFile(file); // Store the actual file
  //   }
  // };
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

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null); // Clear the stored file
    document.getElementById("fileInput").value = "";
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setImageFile(selectedFile);
    } else {
      alert("Please select a valid image file");
      event.target.value = null;
    }
  };
  const displayFeedback = (text) => {
    if (!text) return;

    let index = 0;
    setFeedback(""); // Reset idea before displaying new one
    const interval = setInterval(() => {
      setFeedback((prev) => prev + text[index - 1]);
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval duration as needed
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }
    const imagePart = await fileToGenerativePart(imageFile);
    console.log(imagePart);
    setLoading(true);

    try {
      // const formData = new FormData();
      // formData.append("image", imagePart);
      // formData.append("tags", tags.join(","));

      const response = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({ tags: tags.join(","), imagePart }),
      });

      if (!response.ok) {
        throw new Error("Failed to get feedback");
      }

      const result = await response.json();
      displayFeedback(result.feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      alert("Error fetching feedback. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-black text-white p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2 flex gap-2">
          Feedback <span className="text-[#405fd1]">using AI</span>
          <svg
            className="w-5 h-5"
            viewBox="0 0 46 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 7L18.5535 14.7423C18.8354 15.457 18.9763 15.8143 19.1921 16.1156C19.3834 16.3827 19.6172 16.6166 19.8844 16.8079C20.1857 17.0237 20.543 17.1646 21.2578 17.4465L29 20.5L21.2578 23.5535C20.543 23.8354 20.1857 23.9763 19.8844 24.1921C19.6172 24.3834 19.3834 24.6172 19.1921 24.8844C18.9763 25.1857 18.8354 25.543 18.5535 26.2578L15.5 34L12.4465 26.2578C12.1646 25.543 12.0237 25.1857 11.8079 24.8844C11.6166 24.6172 11.3827 24.3834 11.1156 24.1921C10.8143 23.9763 10.457 23.8354 9.74229 23.5535L2 20.5L9.74229 17.4465C10.457 17.1646 10.8143 17.0237 11.1156 16.8079C11.3827 16.6166 11.6166 16.3827 11.8079 16.1156C12.0237 15.8143 12.1646 15.457 12.4465 14.7423L15.5 7Z"
              stroke="#3753B8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M35.5 1L37.6488 6.44828C37.8471 6.95121 37.9463 7.20268 38.0981 7.41472C38.2327 7.60267 38.3973 7.76723 38.5853 7.90185C38.7973 8.0537 39.0488 8.15288 39.5518 8.35123L45 10.5L39.5518 12.6488C39.0488 12.8471 38.7973 12.9463 38.5853 13.0981C38.3973 13.2327 38.2327 13.3973 38.0981 13.5853C37.9463 13.7973 37.8471 14.0488 37.6488 14.5518L35.5 20L33.3512 14.5518C33.1529 14.0488 33.0537 13.7973 32.9018 13.5853C32.7672 13.3973 32.6027 13.2327 32.4147 13.0981C32.2027 12.9463 31.9512 12.8471 31.4483 12.6488L26 10.5L31.4483 8.35123C31.9512 8.15288 32.2027 8.0537 32.4147 7.90185C32.6027 7.76723 32.7672 7.60267 32.9018 7.41472C33.0537 7.20268 33.1529 6.95121 33.3512 6.44828L35.5 1Z"
              fill="#3753B8"
              stroke="#3753B8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </h1>
        <p className="mb-6">
          Get feedback on your artwork with a detailed explanation of your
          strengths and weaknesses.
        </p>
        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 mb-4 flex flex-col items-center hover:bg-[#0c0c0c] cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {selectedImage ? (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-64 object-contain mb-3"
              />
              <button
                className="absolute top-2 right-2 w-8 bg-red-500 text-white rounded-full p-1"
                onClick={handleRemoveImage}
              >
                &times;
              </button>
            </div>
          ) : (
            <>
              <svg
                className="w-8 h-8 mb-3"
                fill="#868686"
                viewBox="0 0 44 44"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_358_304)">
                  <path d="M44 27.5V34.8333C44 39.8878 39.8878 44 34.8333 44H9.16667C4.11217 44 0 39.8878 0 34.8333V27.5C0 24.4677 2.46767 22 5.5 22H11C13.0222 22 14.6667 23.6445 14.6667 25.6667C14.6667 27.6888 16.3112 29.3333 18.3333 29.3333H25.6667C27.6888 29.3333 29.3333 27.6888 29.3333 25.6667C29.3333 23.6445 30.9778 22 33 22H38.5C41.5323 22 44 24.4677 44 27.5ZM15.9628 9.70383L20.1667 5.5V18.3333C20.1667 19.3472 20.9862 20.1667 22 20.1667C23.0138 20.1667 23.8333 19.3472 23.8333 18.3333V5.5L28.0372 9.70383C28.3947 10.0613 28.864 10.241 29.3333 10.241C29.8027 10.241 30.272 10.0613 30.6295 9.70383C31.3463 8.987 31.3463 7.82833 30.6295 7.1115L24.5923 1.07433C23.8847 0.366667 22.9552 0.011 22.0257 0.0055L22 0L21.9743 0.0055C21.043 0.011 20.1153 0.366667 19.4077 1.07433L13.3705 7.1115C12.6537 7.82833 12.6537 8.987 13.3705 9.70383C14.0873 10.4207 15.246 10.4207 15.9628 9.70383Z" />
                </g>
                <defs>
                  <clipPath id="clip0_358_304">
                    <rect width="44" height="44" />
                  </clipPath>
                </defs>
              </svg>
              <p>Click to upload your artwork</p>
            </>
          )}
        </div>
        <div className="mb-4 flex flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#3753B8] text-white px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
            >
              {tag}
              <button
                className="ml-2 text-lg leading-none"
                onClick={() => handleTagRemove(tag)}
              >
                &times;
              </button>
            </span>
          ))}
          <div className="relative">
            <button
              className="bg-gray-700 text-white px-3 py-1 rounded-full mb-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              +
            </button>
            {showDropdown && (
              <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                {availableTags.map(
                  (tag, index) =>
                    !tags.includes(tag) && (
                      <div
                        key={index}
                        className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleTagAdd(tag)}
                      >
                        {tag}
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </div>
        <button
          className="bg-[#405fd1] text-white py-2 px-6 rounded-lg hover:bg-opacity-80 transition duration-300"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Getting Feedback..." : "Get Feedback"}
        </button>
        {feedback && (
          <div className="mt-6 bg-[#1e1e1e] rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">AI Feedback</h2>
            <p>
              {feedback}
              <span>*</span>
            </p>
          </div>
        )}
        <div className="h-40 w-full"></div>
      </div>
    </div>
  );
};

export default FeedbackPage;
