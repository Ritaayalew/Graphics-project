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

  // Handle window resize for responsiveness
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

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

  return { scene, camera, renderer, drumControls, teddyControls, drumGroup, teddyBearGroup };
}