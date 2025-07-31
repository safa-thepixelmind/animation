"use client";
import React from 'react';

// Define the component as a React Functional Component (FC) for TypeScript
const Button: React.FC = () => {

  /**
   * Handles the mouse move event on the button.
   * It calculates the mouse's position relative to the button
   * and sets CSS custom properties to be used by the ripple effect.
   * @param {React.MouseEvent<HTMLButtonElement>} e The mouse event, typed for TypeScript.
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  };

  return (
    // A container to demonstrate the button
    <>
      
      {/* We embed the necessary CSS directly into the component for simplicity. */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');
          
          .fluid-button {
            --x: 50%;
            --y: 50%;
            position: relative;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
            letter-spacing: 1px;
          }

          /* The ::before pseudo-element creates the wave effect */
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

          /* On hover, scale the wave up to its full size, filling the button */
          .fluid-button:hover::before {
            transform: translate(-50%, -50%) scale(1);
          }

          /* This container holds both text layers */
          .text-container {
            position: relative;
            display: inline-block;
            z-index: 1;
          }

          /* The static white text, visible by default */
          .static-text {
            display: block;
            color: white;
            transition: opacity 0.2s ease-out;
          }
          
          /* On hover, the static text fades out */
          .fluid-button:hover .static-text {
            opacity: 0;
          }

          /* The animated black text, positioned on top of the static text */
          .animated-text {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            color: black;
            /* Starts below its final position */
            transform: translateY(100%);
            /* A fast transition with a cubic-bezier for the bounce effect */
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          /* On hover, the animated text slides into view */
          .fluid-button:hover .animated-text {
            transform: translateY(0%);
          }
        `}
      </style>
      
      <button
        onMouseMove={handleMouseMove}
        className="fluid-button text-2xl font-extrabold bg-black rounded-full px-14 py-4 focus:outline-none border-1 border-transparent hover:border-white"
      >
        <span className="text-container">
          {/* Layer 1: Static white text */}
          <span className="static-text">MENU</span>
          {/* Layer 2: Animated black text */}
          <span className="animated-text">MENU</span>
        </span>
      </button>
      </>
  );
};

export default Button;