"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Box() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  const imageUrls = [
    "/images/cube/front.png",
    "/images/cube/back.jpg",
    "/images/cube/top.jpg",
    "/images/cube/bottom.jpg",
    "/images/cube/right.jpg",
    "/images/cube/left.jpg",
  ];

  const animateCubeIn = () => {
    if (!cubeRef.current) return;
    const cube = cubeRef.current;

    cube.position.z = -100;
    cube.rotation.set(0, 0, 0);

    gsap.to(cube.position, {
      z: 2,
      duration: 2,
      ease: "power2.out",
    });

    gsap.to(cube.rotation, {
      x: "+=10.28",
      y: "+=10.28",
      duration: 2,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const loader = new THREE.TextureLoader();
    const materialPromises = imageUrls.map((url) => loader.loadAsync(url));

    Promise.all(materialPromises).then((textures) => {
      const materials = textures.map(
        (texture) => new THREE.MeshBasicMaterial({ map: texture })
      );

      const isMobile = window.innerWidth < 768;
      const size = isMobile ? 0.9 : 1.4;

      const geometry = new THREE.BoxGeometry(size, size, size);
      const cube = new THREE.Mesh(geometry, materials);
      cube.position.z = isMobile ? 5 : 6.5;

      scene.add(cube);
      cubeRef.current = cube;

      animateCubeIn();
    });

    const animate = () => {
      requestAnimationFrame(animate);

      if (cubeRef.current && !isDraggingRef.current) {
        cubeRef.current.rotation.x += 0.0015;
        cubeRef.current.rotation.y += 0.0015;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => (isDraggingRef.current = false);

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !cubeRef.current) return;

      const delta = {
        x: e.clientX - previousMousePosition.current.x,
        y: e.clientY - previousMousePosition.current.y,
      };

      cubeRef.current.rotation.y += delta.x * 0.01;
      cubeRef.current.rotation.x += delta.y * 0.01;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };
    const onTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      const touch = e.touches[0];
      previousMousePosition.current = { x: touch.clientX, y: touch.clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !cubeRef.current) return;
      const touch = e.touches[0];
      const delta = {
        x: touch.clientX - previousMousePosition.current.x,
        y: touch.clientY - previousMousePosition.current.y,
      };

      cubeRef.current.rotation.y += delta.x * 0.01;
      cubeRef.current.rotation.x += delta.y * 0.01;

      previousMousePosition.current = { x: touch.clientX, y: touch.clientY };
    };

    // Mouse Events
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    // Touch Events
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove);

    return () => {
      if (rendererRef.current && mount) {
        mount.removeChild(rendererRef.current.domElement);
      }
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);

      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div className="w-full h-screen pt-16 flex flex-col sm:flex-row items-center justify-center gap-60 z-50">
      <div className="z-50 sm:mr-8">
        <button
          onClick={animateCubeIn}
          className="absolute 
    left-40 top-[15%] sm:left-55 sm:top-[50%] sm:translate-y-[-50%] sm:right-auto 
    z-50 font-semibold text-black 
    bg-transparent overflow-hidden isolate
    before:absolute before:inset-0 before:bg-orange-500 before:z-[-1]
    before:origin-left before:scale-x-0 
    hover:before:scale-x-100 active:before:scale-x-100
    before:transition-transform before:duration-300"
        >
          Reload Cube
        </button>
      </div>

      <div
        ref={mountRef}
        className="fixed inset-0 z-10 flex items-center justify-center"
      />
    </div>
  );
}
