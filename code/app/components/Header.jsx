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
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex  md:justify-start items-center w-full mb-1 backdrop-blur-[2rem] bg-[#000000ce] bg-opacity-90 border-b border-[#0B0B0B] pl-10 p-3 font-bold">
        <a className="ml-10 p-2" href="/">
          <img src="/logo.svg" alt="logo" className="w-32 object-contain" />
        </a>
      </nav>
    </header>
  );
};

export default Header;
