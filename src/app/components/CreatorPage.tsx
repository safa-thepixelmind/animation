"use client";

// Placeholder for the image with a dashed border
const DashedBorderImage = () => (
  <div className="inline-block w-28 h-14 sm:w-32 sm:h-16 rounded-lg border-2 border-dashed border-black bg-blue-200 p-1">
    {/* You can place an <img> tag here */}
  </div>
);

// Placeholder for the image with an arched border on the right
const ArchBorderImage = () => (
  <div className="inline-block w-28 h-14 sm:w-32 sm:h-16 rounded-l-xl rounded-r-full border-y-2 border-l-2 border-black bg-pink-200 p-1">
    {/* You can place an <img> tag here */}
  </div>
);

// Placeholder for the image with corner brackets
const BracketBorderImage = () => (
  <div className="relative inline-block w-24 h-16 sm:w-28 sm:h-20 p-2">
    {/* The background color/image */}
    <div className="w-full h-full bg-sky-200"></div>
    {/* Top-left bracket */}
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
    {/* Bottom-right bracket */}
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
  </div>
);


export default function CreatorPage() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 overflow-hidden z-3 bg-gray-100 opacity-80">
      {/* Faint background shape */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-1/2 h-48 sm:h-64 bg-blue-500 opacity-10 rounded-[50%] blur-3xl" />
      </div>

      <div className="flex flex-col items-center text-center space-y-2">
        {/* Line 1 */}
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tighter">
            WE CREATE
          </h2>
          <DashedBorderImage />
        </div>

        {/* Line 2 (Outline Text) */}
        <div>
          <h2 
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-transparent"
            style={{ WebkitTextStroke: '2px #1f2937' }} // Outline text effect
          >
            THE NEXT GENERATION
          </h2>
        </div>
        
        {/* Line 3 */}
        <div className="flex items-center justify-center flex-wrap-reverse gap-4 sm:gap-8">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tighter">
            OF ENTERTAINMENT
          </h2>
           <ArchBorderImage />
        </div>

        {/* Line 4 */}
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tighter">WITH</h2>
          <BracketBorderImage />
          {/* Text with drop shadow */}
          <h2 
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tighter"
            style={{ filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.2))' }}
          >
            CREATORS
          </h2>
          <span className="text-4xl sm:text-5xl font-light">↗</span>
        </div>

        {/* Underline */}
        <div className="w-2/3 sm:w-1/2 pt-4">
            <div className="h-1 bg-black"></div>
        </div>
      </div>
    </section>
  );
}