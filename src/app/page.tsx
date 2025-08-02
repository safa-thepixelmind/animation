"use client";

import LoadingAnimation from "@/app/components/Loading";
import { useRef, useState } from "react";

import Box, { BoxHandle } from "@/app/components/Box";
import CreatorPage from "@/app/components/CreatorPage";
import InteractiveOverlay from "@/app/components/InteractiveOverlay";
import MarqueeBar from "@/app/components/MarqueeBar";
import Navbar from "@/app/components/Navbar";
import RevealScreen from "@/app/components/RevealScreen";

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);
  const boxRef = useRef<BoxHandle>(null);

  const handleReloadCube = () => {
    if (boxRef.current) {
      boxRef.current.animateCubeIn();
    }
  };

  return (
    <>
      <div>
        {!loadingDone && (
          <LoadingAnimation onComplete={() => setLoadingDone(true)} />
        )}
        {loadingDone && (
          <RevealScreen>
            <main>
              {/* First Section (Takes full screen) */}
              <section className="relative flex min-h-screen items-center justify-center bg-white">
                <Box ref={boxRef} />
                <InteractiveOverlay onReload={handleReloadCube} />
                <Navbar />
              </section>

              {/* ✅ MarqueeBar is now here, between the sections */}
              <MarqueeBar />
              <CreatorPage />
              
            </main>
          </RevealScreen>
        )}
      </div>
    </>
  );
}