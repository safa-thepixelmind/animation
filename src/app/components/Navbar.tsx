"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button"; // Assuming Button.tsx exists and is styled

// Navigation items for the menu overlay
const navItems = [
  { name: "TOP", href: "/" },
  { name: "CREATOR", href: "/" },
  { name: "TOPICS", href: "/" },
  { name: "COMPANY", href: "/" },
  { name: "CONTACT", href: "/" },
];

// Re-introducing the CloseIcon component for the desired menu design
const CloseIcon = ({ className = "" }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M2 2L26 26" stroke="currentColor" strokeWidth="3" />
    <path d="M26 2L2 26" stroke="currentColor" strokeWidth="3" />
  </svg>
);


const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Effect to prevent the body from scrolling when the menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // This function is for the fluid button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  };

  return (
    <>
      <style>
        {`
          body {
            background-color: #f0f0f0; 
          }

          .fluid-button {
            --x: 50%;
            --y: 50%;
            position: relative;
            overflow: hidden;
          }

          .fluid-button::before {
            content: '';
            position: absolute;
            top: var(--y);
            left: var(--x);
            transform: translate(-50%, -50%) scale(0);
            width: 300px; 
            height: 300px;
            border-radius: 50%;
            background: #f97316; 
            transition: transform 0.6s ease-out;
            z-index: 0;
          }

          .fluid-button:hover::before {
            transform: translate(-50%, -50%) scale(1.2);
          }
          
          .text-container {
            position: relative;
            display: inline-block;
            z-index: 1;
          }

          .static-text {
            display: block;
            color: white;
            transition: opacity 0.2s ease-out;
          }
          
          .fluid-button:hover .static-text {
            opacity: 0;
          }
          
          .animated-text {
            position: absolute;
            top: 0;
            left: 0;
            right: 0; 
            text-align: center; 
            display: block;
            color: black;
            transform: translateY(100%);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s;
          }

          .fluid-button:hover .animated-text {
            transform: translateY(0%);
            color: white;
          }
        `}
      </style>

      {/* Logo - z-index adjusted to appear behind the menu */}
      <div
        className="fixed top-10 left-4 sm:left-8 pointer-events-none font-bold text-[2.5rem] sm:text-[4rem] md:text-[4rem] lg:text-[10rem] leading-none text-black z-1 fontwidth-extrabold text-900 text-gray-800"
      >
        AMANATION
      </div>

      {/* Menu Button - Kept your new fluid button component */}
      <div className="fixed top-5 right-5 sm:top-10 sm:right-10 z-3">
        <div onClick={() => setMenuOpen(!menuOpen)}>
          <Button />
        </div>
      </div>

      {/* Menu Panel - Using the design from our previous conversation */}
      <div
        className={`fixed top-5 right-5 sm:top-10 sm:right-10 bg-[#2a2a2a] text-white
                    w-[90vw] md:w-[45vw] lg:w-[30vw] max-w-md
                    min-h-[600px] md:min-h-[600px]
                    transition-all duration-300 ease-in-out z-51
                    rounded-3xl p-6 md:p-8
                    flex flex-col justify-between
                    transform-origin-top-right
                    ${menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
      >
        {/* Top section: Close button and Nav */}
        <div>
          <div className="flex w-full justify-end">
            <button onClick={() => setMenuOpen(false)} className="relative group">
              <CloseIcon className="text-white" />
              <div className="absolute top-0 left-0 h-full w-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:w-full">
                <CloseIcon className="text-orange-500" />
              </div>
            </button>
          </div>

          <nav className="mt-6 md:mt-10">
            <ul>
              {navItems.map((item, index) => (
                <li
                  key={item.name}
                  className={`mb-4 md:mb-6 transition-all duration-500 ease-in-out
                              ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
                  style={{ transitionDelay: menuOpen ? `${150 + index * 50}ms` : "0ms" }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="relative group inline-block overflow-hidden text-4xl md:text-5xl lg:text-6xl font-normal"
                  >
                    <span>{item.name}</span>
                    <span className="absolute top-0 left-0 h-full w-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:w-full">
                      <span className="text-orange-500">{item.name}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Bottom section: Footer text */}
        <div className="text-left font-bold text-sm tracking-wider pb-8">
            <p>AMANATION IS A CREATOR MANAGEMENT COMPANY</p>
            <p>FROM TOKYO JAPAN</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;