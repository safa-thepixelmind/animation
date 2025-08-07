"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Link from "next/link";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger, SplitText);

const GSAPscrollTrigger = () => {
  const container = useRef(null);
  useGSAP(
  () => {
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1,
      },
    });

    // Define selectors
    const split1 = new SplitText(".animate-text-1", { type: "chars" });
    const split2 = new SplitText(".animate-text-3", { type: "chars" });
    const text2Revealer = ".animate-text-2 .revealer";
    const text2 = ".animate-text-2 h2";

    // ADD THIS LINE to hide the text from the start
    gsap.set(text2, { autoAlpha: 0 });

    // Animate first line
    t1.from(split1.chars, {
      yPercent: 130,
      stagger: 0.1,
      ease: "power1.inOut",
      duration: 1,
    });


    // Animate the revealer
    t1.fromTo(
      text2Revealer,
      { yPercent: 100 },
      { yPercent: 0, duration: 1, ease: 'power1.inOut' }
    )
    .set(text2, { autoAlpha: 1 }) // Make text visible behind revealer
    .to(text2Revealer, { yPercent: -100, duration: 1, ease: 'power1.inOut' }); // Move revealer away

    // Animate third line
    t1.from(split2.chars, {
      yPercent: 130,
      stagger: 0.1,
      ease: "power1.inOut",
      duration: 1,
    });
  },
  { scope: container }
);

  
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

  return (
    <section
      ref={container}
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 overflow-hidden z-3 bg-gray-100 opacity-80"
    >
      {/* Faint background shape */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-1/2 h-48 sm:h-64 bg-blue-500 opacity-10 rounded-[50%] blur-3xl" />
      </div>

      <div className="flex flex-col items-center text-center space-y-2">
        {/* Line 1 */}
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tighter animate-text-1 overflow-hidden">
            WE CREATE
          </h2>
          <DashedBorderImage />
        </div>

        {/* Line 2 (Outline Text) */}
        <div className="relative animate-text-2 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black z-4 revealer"></div>
            <h2
              className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-transparent"
              style={{ WebkitTextStroke: "2px #1f2937" }} // Outline text effect
            >
              THE NEXT GENERATION
            </h2>
        </div>

        {/* Line 3 */}
        <div className="flex items-center justify-center flex-wrap-reverse gap-4 sm:gap-8">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tighter animate-text-3 overflow-hidden">
            OF ENTERTAINMENT
          </h2>
          <ArchBorderImage />
        </div>

        {/* Line 4 */}
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tighter animate-text-4 overflow-hidden">
            WITH
          </h2>
          <BracketBorderImage />
          <Link href="/creators">
            <div
              className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tighter">
          
            CREATORS

                      <span className="text-4xl sm:text-5xl font-light">↗</span>
        {/* Underline */}
        <div className="w-full pt-4">
          <div className="h-1 bg-black"></div>
        </div>
              </div>
          </Link>
        </div>


      </div>
    </section>
  );
};
export default GSAPscrollTrigger;
