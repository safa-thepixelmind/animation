"use client";

import Link from "next/link";

// Component for the scrolling text.
// Responsive: Text size and margins adjust for smaller screens.
const MarqueeText = () => (
  <span className="mx-6 text-2xl font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-orange-500 sm:mx-12 sm:text-4xl">
    Mid-career recruitment (updated June 23, 2025)
  </span>
);

// Component for the square icon placed between the text segments.
// Responsive: Icon size adjusts for smaller screens.
const RecruitIcon = () => (
  <div className="flex items-center justify-center bg-white rounded p-2 mx-4">
    {/* This is the icon that appears IN the marquee scroll */}
    <img src="/images/marquee/recruit.webp" alt="recruit icon" className="w-8 h-8 sm:w-10 sm:h-10" />
  </div>
);

// Responsive: Button and arrow size adjust for smaller screens.
const ArrowButton = () => (
  <div className="flex items-center justify-center w-12 h-12 transition-colors duration-300 bg-white rounded-full sm:w-14 sm:h-14 group-hover:bg-orange-500">
    <span className="text-2xl font-bold text-black transition-colors duration-300 sm:text-3xl group-hover:text-white">→</span>
  </div>
);


export default function MarqueeBar() {
  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 80s linear infinite;
          }
        `}
      </style>

      <Link href="/recruitment" className="block w-full no-underline group" aria-label="View recruitment page">
        {/* Responsive: Vertical padding adjusts */}
        <div className="relative bg-[#1c1c1c] flex items-center w-full overflow-hidden py-2 sm:py-3 z-3">
          
          {/* Container for the infinitely scrolling content */}
          <div className="flex flex-shrink-0 items-center animate-marquee">
            <MarqueeText />
            <RecruitIcon />
            <MarqueeText />
            <RecruitIcon />
            <MarqueeText />
            <RecruitIcon />
          </div>
          
          {/* Duplicate of the content for a seamless loop */}
          <div className="flex flex-shrink-0 items-center animate-marquee" aria-hidden="true">
            <MarqueeText />
            <RecruitIcon />
            <MarqueeText />
            <RecruitIcon />
            <MarqueeText />
            <RecruitIcon />
          </div>
          
          {/* Container for the circular arrow button on the right */}
          {/* Responsive: Padding adjusts */}
          <div className="absolute top-0 right-0 h-full flex items-center pr-4 sm:pr-6 
                        bg-gradient-to-l from-[#1c1c1c] via-[#1c1c1c] to-transparent pl-16 sm:pl-24">
            <ArrowButton />
          </div>

        </div>
      </Link>
    </>
  );
}
