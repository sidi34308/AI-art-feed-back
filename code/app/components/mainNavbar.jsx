"use client";
import React, { useState, useEffect, useCallback } from "react";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

    setIsVisible(visible);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-transform duration-300  ${
        isVisible ? "translate-y-5" : "-translate-y-20"
      }`}
    >
      <div className=" mx-auto flex justify-between items-center px-6 md:px-32">
        <a className="" href="/">
          <img src="/logo2.svg" alt="logo" className="w-32 object-contain" />
        </a>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="https://github.com/sidi34308"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                github
              </a>
            </li>
            <li>
              <a
                href="/ideas"
                className="text-white hover:bg-[#3555c7] bg-[#2B45A3] px-4 py-2 rounded-xl"
              >
                Get started
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
