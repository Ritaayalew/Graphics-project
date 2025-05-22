import * as THREE from 'three';

// Function to set up mouse interaction with raycasting
export function setupInteraction(camera, scene, product) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let originalScale = null;

  // Panel for part name display
  const infoPanel = document.createElement('div');
  infoPanel.style.position = 'absolute';
  infoPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  infoPanel.style.color = 'white';
  infoPanel.style.padding = '5px 10px';
  infoPanel.style.borderRadius = '5px';
  infoPanel.style.display = 'none';
  document.body.appendChild(infoPanel);

  window.addEventListener('click', (event) => {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the mouse position
    raycaster.setFromCamera(mouse, camera);

    // Find intersected objects
    const intersects = raycaster.intersectObjects(product.children, true);

    if (intersects.length > 0) {
      const object = intersects[0].object;

      // Scale effect
      if (originalScale) {
        originalScale.set(1, 1, 1); // Reset previous scale
      }
      originalScale = object.scale.clone();
      object.scale.set(1.2, 1.2, 1.2);

      // Show part name in panel
      infoPanel.textContent = object.name || 'Unnamed Part';
      infoPanel.style.left = `${event.clientX + 10}px`;
      infoPanel.style.top = `${event.clientY + 10}px`;
      infoPanel.style.display = 'block';

      // Reset scale and hide panel after 1 second
      setTimeout(() => {
        object.scale.set(originalScale.x, originalScale.y, originalScale.z);
        infoPanel.style.display = 'none';
      }, 1000);
    }
  });
}