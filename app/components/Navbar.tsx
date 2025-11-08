"use client";

import { useEffect, useState } from "react";
import { LuBraces } from "react-icons/lu";
import Button from "./Button";

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
      className={`fixed top-0 w-full p-5 border-b border-(--dark-gray) bg-(--background) transition-all duration-300 z-50 ${
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
          <Button variant="primary">Sign Up for Free</Button>
          <Button variant="secondary">Log In</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
