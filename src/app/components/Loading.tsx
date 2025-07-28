"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface LoadingAnimationProps {
  onComplete?: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const loadMainPage = async () => {
      const minTime = 500;
      const maxTime = 2500;
      const loadTime = Math.random() * (maxTime - minTime) + minTime;
      const start = Date.now();

      const animate = () => {
        if (!isMounted) return;
        const elapsed = Date.now() - start;
        const percent = Math.min(100, (elapsed / loadTime) * 100);
        setProgress(percent);
        if (percent < 100) {
          requestAnimationFrame(animate);
        }
      };
      animate();

      await new Promise((resolve) => setTimeout(resolve, loadTime));
      if (isMounted) {
        setProgress(100);
        if (onComplete) onComplete();
        setTimeout(() => {
          router.push("/");
        }, 500);
      }
    };

    loadMainPage();

    return () => {
      isMounted = false;
    };
  }, [router, onComplete]);

  return (
    <div className="relative flex min-h-screen bg-[#646464] overflow-hidden">
      {/* Loading bar */}
      <div
        className="absolute top-0 left-0 h-full bg-black transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      ></div>

      {/* ANIMATION text */}
      <div
        className="absolute top-8 left-4 sm:left-8 pointer-events-none font-extrabold tracking-wider text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] leading-none text-[#646464]"
      >
        ANIMATION
      </div>

      {/* Progress number */}
      <div className="absolute left-4 bottom-6 sm:left-8 sm:bottom-12 text-white text-2xl sm:text-3xl md:text-4xl pointer-events-none">
        {Math.round(progress)}
      </div>
    </div>
  );
};

export default LoadingAnimation;
