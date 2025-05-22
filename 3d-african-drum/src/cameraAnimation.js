import * as THREE from 'three';

// Function to animate the camera for drum auto-rotation
export function animateCamera(camera, controls, drumGroup, isDrumActive) {
  let angle = 0;
  let isUserInteracting = false;
  const radius = 5; // Distance from the origin
  const speed = 0.005; // Rotation speed

  // Detect user interaction to pause drum auto-rotation
  controls.addEventListener('start', () => {
    isUserInteracting = true;
  });
  controls.addEventListener('end', () => {
    isUserInteracting = false;
  });

  function animate() {
    if (isDrumActive && !isUserInteracting) {
      angle += speed;
      camera.position.x = radius * Math.cos(angle);
      camera.position.z = radius * Math.sin(angle);
      camera.position.y = 2; // Keep height constant
      camera.lookAt(drumGroup.position); // Always look at the drum
    }
  }

  return animate;
}