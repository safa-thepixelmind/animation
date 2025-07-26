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
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const loader = new THREE.TextureLoader();
    const materialPromises = imageUrls.map((url) => loader.loadAsync(url));

    Promise.all(materialPromises).then((textures) => {
      const materials = textures.map(
        (texture) => new THREE.MeshBasicMaterial({ map: texture })
      );
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3);
      const cube = new THREE.Mesh(geometry, materials);
      cube.position.z = -4;
      scene.add(cube);
      cubeRef.current = cube;

      animateCubeIn();
    });

    const animate = () => {
      requestAnimationFrame(animate);
      if (cubeRef.current) {
        if (!isDraggingRef.current) {
          cubeRef.current.rotation.x += 0.0015;
          cubeRef.current.rotation.y += 0.0015;
        }
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const onMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !cubeRef.current) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.current.x,
        y: event.clientY - previousMousePosition.current.y,
      };

      cubeRef.current.rotation.y += deltaMove.x * 0.01;
      cubeRef.current.rotation.x += deltaMove.y * 0.01;

      previousMousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      if (rendererRef.current && mount) {
        mount.removeChild(rendererRef.current.domElement);
      }
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-20 flex items-center justify-center relative"
    >
      <button
        onClick={animateCubeIn}
        className="inline-flex items-center justify-center whitespace-nowrap px-4 py-2 absolute top-20 left-20 relative overflow-hidden isolate 
              text-black font-bold px-4 py-2 z-50
              bg-transparent
              before:absolute before:inset-0
              before:bg-orange-500 before:z-[-1]
              before:origin-left
              before:scale-x-0
              hover:before:scale-x-100
              before:transition-transform before:duration-300"
      >
        Reload Cube
      </button>
    </div>
  );
}
