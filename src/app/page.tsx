"use client";
import LoadingAnimation from "@/app/components/Loading";
import { useEffect, useState } from "react";

import Box from "@/app/components/Box";
import RevealScreen from "@/app/components/RevealScreen";

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);

  // Show loading only on first mount (reload)
  useEffect(() => {
    setLoadingDone(false);
  }, []);

  return (
    <div>
      {!loadingDone && (
        <LoadingAnimation onComplete={() => setLoadingDone(true)} />
      )}
      {loadingDone && (
        <RevealScreen>
          <div className="flex min-h-screen items-center justify-center bg-white">
            <Box />
          </div>
        </RevealScreen>
      )}
    </div>
  );
}