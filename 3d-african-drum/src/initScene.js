import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';

// Initialize the scene, camera, renderer, and controls
export function initScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // Add the product (African drum)
  const product = createProduct();
  scene.add(product);

  // Add lighting
  addLighting(scene);

  // Set camera position and look at the origin
  camera.position.set(0, 2, 5);
  camera.lookAt(0, 0, 0);

  // Add OrbitControls for zoom and pan (rotation disabled due to auto-rotation)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableRotate = false; // Disable manual rotation
  controls.enableZoom = true;
  controls.enablePan = true;

  // Handle window resize for responsiveness
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  return { scene, camera, renderer, controls, product };
}