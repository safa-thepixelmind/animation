"use client"; // This directive is necessary for client-side functionality in Next.js

import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three'; // Import all of three.js

// Define a type for the mouse position
interface MousePosition {
  x: number;
  y: number;
}

/**
 * Renders a 3D cube with images on each of its six sides.
 * The cube is interactive, allowing users to rotate it by dragging the mouse.
 * It fills the entire screen and sits above any background content.
 */
export default function Box() {
  const mountRef = useRef<HTMLDivElement>(null); // Ref to attach the Three.js canvas
  const cubeRef = useRef<THREE.Mesh | null>(null); // Ref to store the cube mesh
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null); // Ref for the renderer
  const sceneRef = useRef<THREE.Scene | null>(null); // Ref for the scene
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null); // Ref for the camera

  // State for mouse interaction
  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<MousePosition>({ x: 0, y: 0 });

  // Placeholder image URLs for each side of the cube.
  // In a real application, you would replace these with actual image paths.
  const imageUrls = [
    "https://placehold.co/500x500/0000FF/FFFFFF?text=FRONT",  // Front side (Blue)
    "https://placehold.co/500x500/00FF00/FFFFFF?text=BACK",   // Back side (Green)
    "https://placehold.co/500x500/FF0000/FFFFFF?text=TOP",    // Top side (Red)
    "https://placehold.co/500x500/FFFF00/000000?text=BOTTOM", // Bottom side (Yellow)
    "https://placehold.co/500x500/800080/FFFFFF?text=RIGHT",  // Right side (Purple)
    "https://placehold.co/500x500/FFA500/FFFFFF?text=LEFT"    // Left side (Orange)
  ];

  // Function to initialize the Three.js scene, camera, and renderer
  const initThree = useCallback(() => {
    if (!mountRef.current) return;

    // 1. Scene: The container for all objects, lights, and cameras.
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera: Defines what is visible in the scene.
    // PerspectiveCamera(fov, aspect, near, far)
    const camera = new THREE.PerspectiveCamera(
      75, // Field of View
      window.innerWidth / window.innerHeight, // Aspect Ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.z = 2; // Position the camera back to see the cube
    cameraRef.current = camera;

    // 3. Renderer: Renders the scene created by Three.js into the DOM.
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true for transparent background
    renderer.setSize(window.innerWidth, window.innerHeight); // Set renderer size to full window
    renderer.setClearColor(0x000000, 0); // Make background transparent
    rendererRef.current = renderer;

    // Clear any existing canvas and append the new one
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // Load textures for each face of the cube
    const loader = new THREE.TextureLoader();
    const materials: THREE.MeshBasicMaterial[] = [];

    // Create an array of promises for texture loading
    const texturePromises = imageUrls.map(url => {
      return new Promise<THREE.Texture>((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });
    });

    // Wait for all textures to load before creating the cube
    Promise.all(texturePromises)
      .then(textures => {
        textures.forEach(texture => {
          materials.push(new THREE.MeshBasicMaterial({ map: texture }));
        });

        // 4. Geometry: Defines the shape of the object. Here, a cube.
        const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3); // 1x1x1 unit cube

        // 5. Mesh: An object that takes a geometry and applies a material to it.
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube); // Add the cube to the scene
        cubeRef.current = cube; // Store reference to the cube

        // Initial render
        renderer.render(scene, camera);
      })
      .catch(error => {
        console.error("Failed to load one or more textures:", error);
        // Optionally add a fallback cube with solid colors or an error message
        const fallbackMaterials = Array(6).fill(new THREE.MeshBasicMaterial({ color: 0x888888 }));
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const cube = new THREE.Mesh(geometry, fallbackMaterials);
        scene.add(cube);
        cubeRef.current = cube;
        renderer.render(scene, camera);
      });

    // 6. Animation Loop: Renders the scene repeatedly to create animation.
    const animate = () => {
      requestAnimationFrame(animate); // Call animate on the next frame

      // If the cube exists and isn't being dragged, apply a constant rotation
      if (cubeRef.current && !isDragging.current) {
        cubeRef.current.rotation.x += 0.0015;
        cubeRef.current.rotation.y += 0.0015;
      }

      if (sceneRef.current && cameraRef.current && rendererRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate(); // Start the animation loop

  }, []); // Empty dependency array means this runs once on mount

  // Handle window resize to make the canvas responsive
  const handleResize = useCallback(() => {
    if (cameraRef.current && rendererRef.current && mountRef.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    }
  }, []);

  // Mouse interaction for dragging the cube
  const onMouseDown = useCallback((event: MouseEvent) => {
    isDragging.current = true;
    previousMousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging.current || !cubeRef.current) return;

    const deltaMove = {
      x: event.clientX - previousMousePosition.current.x,
      y: event.clientY - previousMousePosition.current.y,
    };

    // Calculate rotation speed based on mouse movement
    const rotationSpeed = 0.005; // Adjust this value for sensitivity

    // Apply rotation based on mouse movement
    cubeRef.current.rotation.y += deltaMove.x * rotationSpeed;
    cubeRef.current.rotation.x += deltaMove.y * rotationSpeed;

    previousMousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  // Set up event listeners for Three.js initialization, resize, and mouse interactions
  useEffect(() => {
    // Initialize Three.js after the component mounts
    initThree();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    // Clean up event listeners and Three.js resources on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);

      if (rendererRef.current) {
        rendererRef.current.dispose(); // Dispose of the renderer
      }
      if (sceneRef.current) {
        // Dispose of geometries and materials in the scene to prevent memory leaks
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [initThree, handleResize, onMouseDown, onMouseUp, onMouseMove]); // Re-run effect if these functions change

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-20" // Fixed position, full screen, high z-index
      style={{
        // Optional: Add a semi-transparent background if you want it to stand out
        // background: 'rgba(0,0,0,0.1)',
        display: 'flex', // Use flexbox for centering if needed
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Three.js will render into this div */}
    </div>
  );
}