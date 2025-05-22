import * as THREE from 'three';
import { initScene } from './initScene.js';
import { addLighting } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { animateCamera } from './cameraAnimation.js';

// Initialize the scene
const { scene, camera, renderer, controls, product } = initScene();

// Add lighting
addLighting(scene);

// Set up interaction
setupInteraction(camera, scene, product);

// Set up camera animation
const animate = animateCamera(camera, controls);

// Animation loop
function animateLoop() {
  requestAnimationFrame(animateLoop);
  animate(); // Update camera position
  controls.update(); // Update controls
  renderer.render(scene, camera);
}
animateLoop();