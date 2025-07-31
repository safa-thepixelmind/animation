"use client";

import gsap from "gsap";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

// Define the shape of the methods that the parent can call
export interface BoxHandle {
  animateCubeIn: () => void;
}

const Box = forwardRef<BoxHandle>((props, ref) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const isDraggingRef = useRef(false);
  const previousPositionRef = useRef({ x: 0, y: 0 });

  const imageUrls = [
    "/images/cube/front.png", "/images/cube/back.jpg", "/images/cube/top.jpg",
    "/images/cube/bottom.jpg", "/images/cube/right.jpg", "/images/cube/left.jpg",
  ];

  const animateCubeIn = () => {
    if (!cubeRef.current) return;
    const cube = cubeRef.current;
    cube.position.z = -100;
    cube.rotation.set(0, 0, 0);

    gsap.to(cube.position, { z: 2, duration: 2, ease: "power2.out" });
    gsap.to(cube.rotation, { x: "+=10.28", y: "+=10.28", duration: 2, ease: "power2.out" });
  };

  // Expose the animateCubeIn function to the parent component via the ref
  useImperativeHandle(ref, () => ({
    animateCubeIn,
  }));
  
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- Scene, Camera, and Renderer Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 4;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // --- Cube Creation ---
    const loader = new THREE.TextureLoader();
    const materialPromises = imageUrls.map((url) => loader.loadAsync(url));

    Promise.all(materialPromises).then((textures) => {
      const materials = textures.map((texture) => new THREE.MeshBasicMaterial({ map: texture }));
      const isMobile = window.innerWidth < 768;
      const size = isMobile ? 0.9 : 1.3;
      const geometry = new THREE.BoxGeometry(size, size, size);
      
      const cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);
      cubeRef.current = cube;
      animateCubeIn(); // Initial animation
    });
    
    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);
      if (cubeRef.current && !isDraggingRef.current) {
        cubeRef.current.rotation.y += 0.0015;
        cubeRef.current.rotation.x += 0.0015;
      }
      renderer.render(scene, camera);
    };
    animate();

    // --- Unified Event Handlers for Mouse and Touch ---
    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
      previousPositionRef.current = { x: clientX, y: clientY };
    };

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || !cubeRef.current) return;
      const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
      const delta = { x: clientX - previousPositionRef.current.x, y: clientY - previousPositionRef.current.y };
      cubeRef.current.rotation.y += delta.x * 0.01;
      cubeRef.current.rotation.x += delta.y * 0.01;
      previousPositionRef.current = { x: clientX, y: clientY };
    };

    const handleDragEnd = () => { isDraggingRef.current = false; };

    // --- Event Listener Management ---
    const events: [string, EventListener][] = [
      ['mousedown', handleDragStart as EventListener], ['touchstart', handleDragStart as EventListener],
      ['mousemove', handleDragMove as EventListener], ['touchmove', handleDragMove as EventListener],
      ['mouseup', handleDragEnd], ['touchend', handleDragEnd], ['mouseleave', handleDragEnd]
    ];
    
    events.forEach(([event, handler]) => window.addEventListener(event, handler));

    // --- Cleanup ---
    return () => {
      mount.removeChild(renderer.domElement);
      events.forEach(([event, handler]) => window.removeEventListener(event, handler));
    };
  }, []);

  return (
    <div className="fixed inset-0 z-2 flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
});

// Set a display name for the component for better debugging
Box.displayName = 'Box';

export default Box;