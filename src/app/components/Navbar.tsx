"use client";

import React, { useState } from "react";

const navItems = [
  { name: "TOP", href: "/" },
  { name: "CREATOR", href: "/" },
  { name: "TOPICS", href: "/" },
  { name: "COMPANY", href: "/" },
  { name: "CONTACT", href: "/" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Left Logo */}
      <div className="fixed top-5 left-5 sm:top-10 sm:left-10 z-49">
        <h1 className="pointer-events-none font-extrabold tracking-wider text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[8rem] leading-none text-black">
          AMANATION
        </h1>
      </div>

      {/* Top Right MENU Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-5 right-5 sm:top-10 sm:right-10 z-50 px-12 py-5 bg-black text-white tracking-wider font-bold text-sm sm:text-base rounded-full"
      >
        MENU
      </button>

    </>
  );
};

export default Navbar;
