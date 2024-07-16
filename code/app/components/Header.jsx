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
      <nav className="flex justify-around md:justify-start items-center w-full mb-1 backdrop-blur-[1rem] bg-[#black] bg-opacity-90 border-b border-[#0B0B0B] pl-10 p-3 font-bold">
        <a className="ml-10 p-2" href="#">
          <img src="/logo.svg" alt="logo" className="w-32 object-contain" />
        </a>
        {/* <div className="hidden md:flex text-center items-center space-x-10 p-1">
                    <a href="#about" className="text-white text-sm  p-3  rounded-full hover:bg-[#0C0C0C] transition duration-300">من نحن</a>
                    <a href="#services" className="text-white text-sm  p-3 rounded-full  hover:bg-[#0C0C0C] transition duration-300">خدماتنا</a>
                    <a href="#contact" className="text-white text-sm p-3  rounded-full  hover:bg-[#0C0C0C] transition duration-300">اتصل بنا</a>
                </div> */}
        {/* <div className="md:hidden flex items-center">
                    <button className="text-black bg-[#CEA333] p-2 rounded-full" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition duration-300 transform hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>

                </div>
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-black bg-opacity-90 p-4">
                        <ul className="text-white text-sm">
                            <li className="mb-4"><a href="#about" onClick={toggleMenu} className="hover:text-gray-300 transition duration-300">من نحن   </a></li>
                            <li className="mb-4"><a href="#services" onClick={toggleMenu} className="hover:text-gray-300 transition duration-300">خدماتنا</a></li>
                            <li><a href="#contact" onClick={toggleMenu} className="hover:text-gray-300 transition duration-300">اتصل بنا</a></li>
                        </ul>
                    </div>
                )} */}
      </nav>
    </header>
  );
};

export default Header;
