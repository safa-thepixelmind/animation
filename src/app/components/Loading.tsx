"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface LoadingAnimationProps {
    onComplete?: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;
        // Simulate loading:
        const loadMainPage = async () => {
            const minTime = 500; // minimum loading time in ms
            const maxTime = 2500; // maximum loading time in ms
            const loadTime = Math.random() * (maxTime - minTime) + minTime;
            const start = Date.now();

            // Progress bar animation based on elapsed time
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

            // Simulate loading
            await new Promise((resolve) => setTimeout(resolve, loadTime));
            if (isMounted) {
                setProgress(100);
                // Redirect to another page,
                if (onComplete) onComplete();
                setTimeout(() => {
                    router.push('/');
                }, 500); // slight delay for smoothness
            }
        };
        loadMainPage();
        return () => {
            isMounted = false;
        };
    }, [router]);
    return (
        <div className="relative flex min-h-screen bg-[#646464] overflow-hidden">
            <div
                className="absolute top-0 left-0 h-full bg-black transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
            ></div>
            <div
                className="absolute top-8 left-10 font-extrabold tracking-wider pointer-events-none"
                style={{
                    color: '#646464',
                    fontSize: '8rem',
                    lineHeight: '1',
                }}
            >
                ANIMATION
            </div>
            <div className="absolute left-0 bottom-0 text-white text-3xl md:text-3xl lg:text-3xl pointer-events-none pb-12 pl-12">
                {Math.round(progress)}
            </div>
        </div>
    );
    
};

export default LoadingAnimation;