import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { animateCamera } from './cameraAnimation.js';
import { setupInteraction } from './interaction.js';

// Initialize the scene, camera, renderer, and controls
export function initScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // Add this for better quality on high-DPI displays
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // Add the products (drum and teddy bear)
  const { drumGroup, teddyBearGroup } = createProduct();
  scene.add(drumGroup);
  scene.add(teddyBearGroup);

  // Add lighting
  addLighting(scene);

  // Set initial camera position
  camera.position.set(0, 2, 5);
  camera.lookAt(drumGroup.position);

  // Add OrbitControls for the drum (auto-rotation, zoom, pan)
  const drumControls = new OrbitControls(camera, renderer.domElement);
  drumControls.enableRotate = false; // Disable manual rotation for auto-rotation
  drumControls.enableZoom = true;
  drumControls.enablePan = true;
  drumControls.target.set(0, 0, 0); // Focus on drum center

  // Dummy teddyControls (used as a flag for interaction)
  const teddyControls = { enabled: false };

  // Set up camera auto-rotation for drum
  const animateCam = animateCamera(camera, drumControls, drumGroup, true);

  // Set up interaction (raycasting and control toggling)
  const isTeddyActive = setupInteraction(camera, scene, drumGroup, teddyBearGroup, drumControls, teddyControls, camera);

  // Enhanced window resize handler
  function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Update renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
    
    // Update camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    console.log('Window resized to:', width, height);
  }

  // Set up event listeners
  window.addEventListener('resize', handleResize);
  handleResize(); // Call once to set initial sizes properly

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Update drum controls
    drumControls.update();

    // Update camera auto-rotation for drum
    animateCam(camera, drumControls, drumGroup, !isTeddyActive());

    renderer.render(scene, camera);
  }
  animate();

  // Cleanup function (optional - useful if you need to destroy the scene later)
  function cleanup() {
    window.removeEventListener('resize', handleResize);
    renderer.dispose();
  }

  return { 
    scene, 
    camera, 
    renderer, 
    drumControls, 
    teddyControls, 
    drumGroup, 
    teddyBearGroup,
    cleanup // Export cleanup if needed
  };
}