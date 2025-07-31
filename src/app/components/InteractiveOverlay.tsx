"use client";

// Define the type for the component's props
interface InteractiveOverlayProps {
  onReload: () => void;
}

export default function InteractiveOverlay({ onReload }: InteractiveOverlayProps) {
  return (
    // Main container to hold all overlay elements
    <div className="absolute inset-0 z-20 w-full h-full pointer-events-none text-gray-900">
      
      {/* Section 1: Reload Button (Top-Left) */}
      <div className="absolute top-[15%] left-10 sm:left-[11%] sm:top-1/2 sm:-translate-y-1/2">
        <button
          onClick={onReload}
          className="pointer-events-auto font-semibold bg-transparent overflow-hidden isolate
            before:absolute before:inset-0 before:bg-orange-500 before:z-[-1]
            before:origin-left before:scale-x-0 
            hover:before:scale-x-100 active:before:scale-x-100
            before:transition-transform before:duration-300 text-sm"
        >
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            RELOAD BOX
          </span>
        </button>
      </div>

      {/* Section 2: Creator Info (Right) */}
      {/* MOVED LEFT: Changed right-[5%] to right-[8%] */}
      <div className="absolute top-1/2 right-[10%] sm:right-[20%] -translate-y-1/2">
        <div className="text-right">
          <h2 className="text-3xl font-bold">Creator</h2>
          <a
            href="#"
            className="pointer-events-auto text-sm inline-block mt-6 group text-gray-500 font-semibold"
          >
            VIEW MORE
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ml-1 font-semibold text-white bg-gray-300 rounded-lg px-2">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Section 3: Footer (Bottom-Left) */}
      {/* MOVED UP: Changed bottom-4 to bottom-8. Also aligned left position. */}
      <div className="absolute bottom-15 left-5 sm:left-[5%] text-sm font-semibold uppercase">
        <p>Creator Management Company</p>
        <p>From Tokyo, Japan</p>
      </div>

    </div>
  );
}