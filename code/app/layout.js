import { Inter } from "next/font/google";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import Head from "next/head";
import Header from "./components/Header";
import Script from "next/script";
const iBM_Plex_Sans_Arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

import "./globals.css";
import FootBar from "./components/FooterBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "artists AI",
  description:
    "AI is your creative partner. Artist's AI offers feedback, reference images, and fresh ideas to assist you at every stage of your artistic journey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Artist&apos;s AI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></Script>

      <body className={iBM_Plex_Sans_Arabic.className}>
        <section className="bg-black">{children}</section>
      </body>
    </html>
  );
}
