import * as THREE from 'three';

// Function to add lighting to the scene
export function addLighting(scene) {
  // Ambient light for general illumination
  const ambientLight = new THREE.AmbientLight(0x606060, 1);
  scene.add(ambientLight);

  // Directional light for highlights and shadows
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(70, 20, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Optional: Second light for balanced illumination
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
  directionalLight2.position.set(-5, 3, -5);
  scene.add(directionalLight2);
}