import * as THREE from 'three';

// Function to set up mouse interaction with raycasting
export function setupInteraction(camera, scene, drumGroup, teddyBearGroup, drumControls, teddyControls, cameraForReset) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let currentObject = null;
  let currentTimeout = null;
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

  // Variables for custom teddy bear interaction
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  const rotationSpeed = 0.005;
  const zoomSpeed = 0.1;

  // Custom mouse events for teddy bear rotation and zooming
  window.addEventListener('mousedown', (event) => {
    if (teddyControls.enabled) {
      isDragging = true;
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    }
  });

  window.addEventListener('mousemove', (event) => {
    if (isDragging && teddyControls.enabled) {
      const deltaX = event.clientX - previousMousePosition.x;
      const deltaY = event.clientY - previousMousePosition.y;

      // Rotate teddyBearGroup
      teddyBearGroup.rotation.y += deltaX * rotationSpeed;
      teddyBearGroup.rotation.x += deltaY * rotationSpeed;

      // Clamp vertical rotation to prevent flipping
      teddyBearGroup.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, teddyBearGroup.rotation.x));

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('wheel', (event) => {
    if (teddyControls.enabled) {
      // Zoom by scaling teddyBearGroup
      const scaleFactor = event.deltaY > 0 ? 1 - zoomSpeed : 1 + zoomSpeed;
      const newScale = teddyBearGroup.scale.x * scaleFactor;
      // Clamp scale to prevent extreme zooming
      if (newScale > 0.5 && newScale < 2) {
        teddyBearGroup.scale.set(newScale, newScale, newScale);
      }
    }
  });

  window.addEventListener('click', (event) => {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the mouse position
    raycaster.setFromCamera(mouse, camera);

    // Find intersected objects
    const drumIntersects = raycaster.intersectObjects(drumGroup.children, true);
    const teddyIntersects = raycaster.intersectObjects(teddyBearGroup.children, true);

    console.log('Drum intersects:', drumIntersects.length, drumIntersects.map(i => i.object.name));
    console.log('Teddy intersects:', teddyIntersects.length, teddyIntersects.map(i => i.object.name));

    let object = null;
    if (teddyIntersects.length > 0) {
      // Clicked on teddy bear
      teddyControls.enabled = true;
      drumControls.enabled = false;
      cameraForReset.position.set(0, 2, 5); // Reset camera position
      cameraForReset.lookAt(drumGroup.position); // Look at drum
      object = teddyIntersects[0].object;
      console.log('Switched to teddy bear controls, enabled:', teddyControls.enabled);
    } else if (drumIntersects.length > 0) {
      // Clicked on drum
      drumControls.enabled = true;
      teddyControls.enabled = false;
      drumControls.target.set(0, 0, 0); // Focus on drum
      cameraForReset.position.set(0, 2, 5); // Reset camera position
      cameraForReset.lookAt(drumGroup.position); // Look at drum
      object = drumIntersects[0].object;
      console.log('Switched to drum controls, enabled:', drumControls.enabled);
    } else {
      console.log('No intersection detected');
    }

    if (object) {
      // Reset previous object scale if exists
      if (currentObject && originalScale) {
        console.log('Resetting scale for previous object:', currentObject.name);
        currentObject.scale.copy(originalScale);
        if (currentTimeout) {
          clearTimeout(currentTimeout);
        }
      }

      // Store new object and its original scale
      currentObject = object;
      originalScale = object.scale.clone();
      object.scale.set(1.2, 1.2, 1.2);
      console.log('Scaling object:', object.name, 'to 1.2x');

      // Show part name in panel
      infoPanel.textContent = object.name || 'Unnamed Part';
      infoPanel.style.left = `${event.clientX + 10}px`;
      infoPanel.style.top = `${event.clientY + 10}px`;
      infoPanel.style.display = 'block';

      // Reset scale and hide panel after 1 second
      currentTimeout = setTimeout(() => {
        if (currentObject) {
          console.log('Restoring scale for object:', currentObject.name);
          currentObject.scale.copy(originalScale);
          currentObject = null;
          originalScale = null;
          currentTimeout = null;
        }
        infoPanel.style.display = 'none';
      }, 1000);
    }
  });

  return () => teddyControls.enabled; // Return a function to check if teddyControls is active
}