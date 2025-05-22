import * as THREE from 'three';

// Function to animate the camera
export function animateCamera(camera, controls) {
  let angle = 0;
  let isUserInteracting = false;
  const radius = 5; // Distance from the origin
  const speed = 0.005; // Rotation speed

  // Detect user interaction to pause auto-rotation
  controls.addEventListener('start', () => {
    isUserInteracting = true;
  });
  controls.addEventListener('end', () => {
    isUserInteracting = false;
  });

  function animate() {
    if (!isUserInteracting) {
      angle += speed;
      camera.position.x = radius * Math.cos(angle);
      camera.position.z = radius * Math.sin(angle);
      camera.position.y = 2; // Keep height constant
      camera.lookAt(0, 0, 0); // Always look at the origin
    }
  }

  return animate;
}