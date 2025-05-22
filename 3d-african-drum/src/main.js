import * as THREE from 'three';
import { initScene } from './initScene.js';
import { addLighting } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { animateCamera } from './cameraAnimation.js';

// Initialize the scene
const { scene, camera, renderer, drumControls, teddyControls, drumGroup, teddyBearGroup } = initScene();

// Add lighting
addLighting(scene);

// Set up interaction
const isTeddyActive = setupInteraction(camera, scene, drumGroup, teddyBearGroup, drumControls, teddyControls, camera);

// Set up camera animation for drum
const animateCam = animateCamera(camera, drumControls, drumGroup, true);

// Animation loop
function animateLoop() {
  requestAnimationFrame(animateLoop);

  // Update camera auto-rotation for drum
  animateCam(camera, drumControls, drumGroup, !isTeddyActive());

  // Update drum controls
  drumControls.update();

  renderer.render(scene, camera);
}
animateLoop();