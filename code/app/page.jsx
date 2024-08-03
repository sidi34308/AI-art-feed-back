"use client";

import Head from "next/head";
import { useEffect, useRef } from "react";
import MainNavbar from "./components/mainNavbar";
import { motion } from "framer-motion";

const Home = () => {
  const videoRefs = [useRef(), useRef(), useRef()];

  useEffect(() => {
    videoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.play();
      }
    });
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className=" bg-gradient-to-b from-black to-gray-900 text-black">
      <MainNavbar />
      <main className="bg-[#F0F0F0] pt-20">
        <section className=" flex flex-col justify-center items-center text-left sm:text-center px-6 md:px-20 pt-20">
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-5"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 1 }}
          >
            Unleash Your Creativity with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3149a1] to-[#4a6ce6]">
              Artist&apos;s AI
            </span>
          </motion.h1>
          <motion.p
            className="text-md md:text-md mb-12 max-w-xl"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.5, duration: 1 }}
          >
            AI is your creative partner. Artist&apos;s AI offers feedback,
            reference images, and fresh ideas to assist you at every stage of
            your artistic journey.
          </motion.p>
          <div className="flex  justify-start sm:justify-center space-x-4">
            <a
              href="/ideas"
              className="text-white bg-[#2B45A3] px-4 py-2 md:px-6 md:py-3 rounded-2xl transition duration-300 ease-in-out hover:bg-[#3656c2]"
            >
              Get started
            </a>
            <a className="border border-white bg-[#fcfcfc] px-4 py-2 md:px-6 md:py-3 rounded-2xl transition duration-300 ease-in-out hover:bg-white hover:text-black cursor-pointer">
              Learn more
            </a>
          </div>

          <div className="pt-3">
            <img src="/mockup.png" className="w-full" />
          </div>
        </section>

        <section className="text-white bg-black px-6 md:px-32 more">
          <div className="h-full md:h-screen grid grid-cols-1 md:grid-cols-2 gap-6 items-center ">
            <motion.div
              className="py-10 md:py-20 rounded-2xl"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Get Feedback on Your Artwork
              </h2>
              <p className="paragraph text-gray-400 text-md md:text-md mb-6">
                Receive insightful feedback from our advanced AI model tailored
                to improve your artistic skills. Upload your artwork and let our
                AI analyze and provide constructive comments to help you refine
                and perfect your work. Discover new perspectives and elevate
                your art to the next level.
              </p>
              <a
                href="/feedback"
                className="bg-[#2B45A3] px-4 py-2 md:px-6 md:py-3 rounded-2xl transition duration-300 ease-in-out hover:bg-[#3656c2]"
              >
                Try it now
              </a>
            </motion.div>
            <video
              className="w-full rounded-3xl shadow-sm shadow-white"
              autoPlay
              loop
              muted
              playsInline
              src="/videos/video1.mp4"
            />
          </div>

          <div className="h-full md:h-screen grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-10">
            <motion.div
              className="py-10 md:py-20 rounded-2xl"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Find Perfect Reference Images
              </h2>
              <p className="paragraph text-gray-400 text-md md:text-md mb-6">
                Need inspiration or a specific reference image for your project?
                Our AI-powered image search feature connects you with a vast
                library of high-quality images. Use the intuitive search tool to
                find the perfect reference that fits your vision. Say goodbye to
                endless scrolling and find exactly what you need in seconds.
              </p>
              <a
                href="/imageSearch"
                className="bg-[#2B45A3] px-4 py-2 md:px-6 md:py-3 rounded-2xl transition duration-300 ease-in-out hover:bg-[#3656c2]"
              >
                Start your search
              </a>
            </motion.div>
            <video
              className="w-full rounded-2xl shadow-sm shadow-white"
              autoPlay
              loop
              muted
              playsInline
              src="/videos/video3.mp4"
            />
          </div>

          <div className="h-full md:h-screen grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-10">
            <motion.div
              className="py-10 md:py-20 rounded-2xl"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 1, delay: 1 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Generate Creative Ideas
              </h2>
              <p className="paragraph text-gray-400 text-md md:text-md mb-6">
                Stuck in a creative rut? Our idea generator is designed to spark
                your imagination and kickstart your next project. Choose your
                field of art, select a famous person for inspiration, or provide
                keywords to generate unique and exciting ideas tailored to your
                preferences. Let our AI inspire your next great piece of art.
              </p>
              <a
                href="/ideas"
                className="bg-[#2B45A3] px-4 py-2 md:px-6 md:py-3 rounded-2xl transition duration-300 ease-in-out hover:bg-[#3656c2]"
              >
                Get inspired
              </a>
            </motion.div>
            <video
              className="w-full rounded-2xl shadow-sm shadow-white"
              autoPlay
              loop
              muted
              playsInline
              src="/videos/video2.mp4"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
