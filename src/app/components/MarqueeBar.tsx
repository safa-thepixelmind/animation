"use client";

import Link from "next/link";

const NewsPill = () => (
  <div className="bg-white text-black text-[10px] font-bold px-3 py-1 flex-shrink-0">
    NEWS
  </div>
);

const MarqueeText = () => (
  // ✅ Text size increased from text-lg to text-2xl
  <span className="mx-12 text-2xl font-medium tracking-wide">
    Mid-career recruitment (updated July 31, 2025)
  </span>
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
            animation: marquee 40s linear infinite;
          }
        `}
      </style>

      {/* ✅ Link no longer needs absolute positioning */}
      <Link href="/recruitment" className="block group w-full">
        {/* ✅ Added `relative` to be the anchor for the absolute arrow */}
        <div className="relative bg-[#1c1c1c] text-white flex items-center w-full overflow-hidden z-3">
          <div className="flex-shrink-0 p-5">
            <NewsPill />
          </div>
          
          <div className="flex animate-marquee whitespace-nowrap py-5">
            <MarqueeText />
            <MarqueeText />
            <MarqueeText />
            <MarqueeText />
          </div>
          
          <div className="flex animate-marquee whitespace-nowrap py-5" aria-hidden="true">
            <MarqueeText />
            <MarqueeText />
            <MarqueeText />
            <MarqueeText />
          </div>
          
          {/* ✅ Arrow is now positioned absolutely to stay fixed on the right */}
          <div className="absolute top-0 right-0 h-full flex items-center bg-gradient-to-l from-[#1c1c1c] via-[#1c1c1c] to-transparent pr-5 pl-10">
            <div className="text-2xl transition-transform duration-300 group-hover:translate-x-1">
              →
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}