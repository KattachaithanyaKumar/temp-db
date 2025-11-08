"use client";

import { useEffect, useState } from "react";
import { LuBraces } from "react-icons/lu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full p-5 border-b border-(--dark-gray) bg-(--background) transition-all duration-300 ${
        isScrolled ? "shadow-xl" : "shadow-none"
      }`}
    >
      <div className="max-w-[1000px] mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <LuBraces size={24} color="var(--blue)" />
          <h1 className="text-2xl font-bold">TempDB</h1>
        </div>

        {/* Center - Nav Links */}
        <ul className="flex items-center gap-6">
          <li className="text-(--text-light) text-sm cursor-pointer hover:opacity-80 transition-all">
            Pricing
          </li>
          <li className="text-(--text-light) text-sm cursor-pointer hover:opacity-80 transition-all">
            Docs
          </li>
        </ul>

        {/* Right - Buttons */}
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 font-bold text-md bg-(--blue) rounded-md cursor-pointer hover:opacity-80 transition-all">
            Sign up for Free
          </button>
          <button className="px-6 py-2 font-bold text-md bg-(--light-gray) rounded-md cursor-pointer hover:opacity-80 transition-all">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
