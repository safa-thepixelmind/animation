"use client";
import React, { useEffect, useRef, useState } from 'react';

const RevealScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [revealed, setRevealed] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Start the reveal animation after mount
        const timeout = setTimeout(() => {
            setRevealed(true);
        }, 10); // slight delay for effect
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="relative w-full h-full min-h-screen overflow-hidden">
            <div
                ref={overlayRef}
                className={`absolute top-0 left-0 h-full w-full bg-black z-20 transition-transform duration-1000 ease-in-out ${revealed ? 'translate-x-full' : 'translate-x-0'}`}
                style={{ willChange: 'transform' }}
            ></div>
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default RevealScreen;