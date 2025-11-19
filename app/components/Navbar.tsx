"use client";

import { Activity, useEffect, useState } from "react";
import Button from "./Button";
import Logo from "./Logo";
import AuthModal from "../features/auth/AuthModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpen = (mode: "login" | "signup") => {
    setIsModalOpen(true);
    setAuthMode(mode);
  };

  return (
    <div
      className={`fixed top-0 w-full p-5 border-b border-(--dark-gray) bg-(--background) transition-all duration-300 z-50 ${
        isScrolled ? "shadow-xl" : "shadow-none"
      }`}
    >
      <div className="max-w-[1000px] mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <Logo />

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
          <Button variant="primary" onClick={() => handleOpen("signup")}>
            Sign Up for Free
          </Button>
          <Button variant="secondary" onClick={() => handleOpen("login")}>
            Log In
          </Button>
        </div>
      </div>

      <Activity mode={isModalOpen ? "visible" : "hidden"}>
        <AuthModal
          open={isModalOpen}
          onOk={handleClose}
          onCancel={handleClose}
          initialMode={authMode}
        />
      </Activity>
    </div>
  );
};

export default Navbar;
