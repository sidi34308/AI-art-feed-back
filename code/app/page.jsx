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
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <MainNavbar />
      <main className="mt-20">
        <section className="text-center px-20 pt-20">
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-5"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 1 }}
          >
            Let&apos;s generate ideas{" "}
            <span className="text-blue-600">using AI</span>
          </motion.h1>
          <motion.p
            className="text-md md:text-xl mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Explore the wonders of our solar system with this captivating 3D
            simulation of the planets using Three.js.
          </motion.p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 px-6 py-3 rounded-lg">
              Get started
            </button>
            <button className="border border-white px-6 py-3 rounded-lg">
              More
            </button>
          </div>

          <div className="pt-8">
            <img src="/mockups.png" className="w-full" />
          </div>
        </section>

        <section className="bg-black px-32">
          <div className="h-screen grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <motion.div
              className="py-20 rounded-lg"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 1 }}
            >
              <h2 className="text-3xl font-bold mb-4">Feature 3</h2>
              <p className="text-gray-400 text-xl mb-4">
                Description of Feature 3. Explore the wonders of our solar
                system with this captivating 3D simulation of the planets using
                Three.js.
              </p>
            </motion.div>
            <video
              className="w-full rounded-3xl shadow-sm shadow-white"
              autoPlay
              loop
              muted
              playsInline
              src="/videos/vid1.mp4"
            />
          </div>

          <div className="h-screen grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-10">
            <motion.div
              className="py-20 rounded-lg"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Feature 3</h2>
              <p className="text-gray-400 text-xl mb-4">
                Description of Feature 3. Explore the wonders of our solar
                system with this captivating 3D simulation of the planets using
                Three.js.
              </p>
            </motion.div>
            <video
              className="w-full rounded-2xl shadow-sm shadow-white"
              autoPlay
              loop
              muted
              playsInline
              src="/videos/vid1.mp4"
            />
          </div>

          <div className="h-screen grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-10">
            <motion.div
              className="py-20 rounded-lg"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 1, delay: 1 }}
            >
              <h2 className="text-3xl font-bold mb-4">Feature 3</h2>
              <p className="text-gray-400 text-xl mb-4">
                Description of Feature 3. Explore the wonders of our solar
                system with this captivating 3D simulation of the planets using
                Three.js.
              </p>
            </motion.div>
            <video
              className="w-full rounded-2xl shadow-sm shadow-white"
              autoPlay
              loop
              muted
              playsInline
              src="/videos/vid1.mp4"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
