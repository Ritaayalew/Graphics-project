import * as THREE from 'three';

// Function to create the African Ceremonial Drum (Yoruba Dundun)
export function createProduct() {
  const group = new THREE.Group();

  // 1. Main Drum Body (More Pronounced Hourglass Shape)
  const topHeadGeometry = new THREE.CylinderGeometry(1.0, 1.0, 0.1, 32);
  const drumMaterial = new THREE.MeshStandardMaterial({ color: 0x5C2F1A }); // Deeper reddish-brown
  const topHead = new THREE.Mesh(topHeadGeometry, drumMaterial);
  topHead.position.set(0, 0.8, 0);
  topHead.name = 'Drum Head Top';
  group.add(topHead);

  const bottomHead = topHead.clone();
  bottomHead.position.set(0, -0.8, 0);
  bottomHead.name = 'Drum Head Bottom';
  group.add(bottomHead);

  // Middle Section (Thicker Waist for Hourglass Shape)
  const waistGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.0, 32); // Increased radius to 0.4
  const waist = new THREE.Mesh(waistGeometry, drumMaterial);
  waist.position.set(0, 0, 0);
  waist.name = 'Drum Waist';
  group.add(waist);

  // Add Subtle Cylindrical Bands for Detail
  const bandGeometry = new THREE.CylinderGeometry(0.42, 0.42, 0.08, 32); // Adjusted radius for thicker waist
  const bandMaterial = new THREE.MeshStandardMaterial({ color: 0x0D0D00 }); // Lighter wood tone
  const band1 = new THREE.Mesh(bandGeometry, bandMaterial);
  band1.position.set(0, 0.3, 0);
  band1.name = 'Waist Band 1';
  group.add(band1);

  const band2 = band1.clone();
  band2.position.set(0, -0.3, 0);
  band2.name = 'Waist Band 2';
  group.add(band2);

  // 2. Drumhead Skin (Flat Cylinders for a Stretched Look)
  const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xF5F5DC }); // Natural beige
  const topSkinGeometry = new THREE.CylinderGeometry(1.0, 1.0, 0.02, 32);
  const topSkin = new THREE.Mesh(topSkinGeometry, skinMaterial);
  topSkin.position.set(0, 0.85, 0);
  topSkin.name = 'Top Skin';
  group.add(topSkin);

  const bottomSkin = topSkin.clone();
  bottomSkin.position.set(0, -0.85, 0);
  bottomSkin.name = 'Bottom Skin';
  group.add(bottomSkin);

  // 3. Tension Ropes (Connected to Top and Bottom Drumheads)
  const ropeGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.7, 16); // Fixed length
  const ropeMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B }); // Natural brown
  const numRopes = 16; // Reduced for authenticity
  for (let i = 0; i < numRopes; i++) {
    const angle = (i / numRopes) * Math.PI * 2;
    // Define exact endpoints at drumhead edges
    const topX = 1.0 * Math.cos(angle); // Edge of drumhead (radius 1.0)
    const topZ = 1.0 * Math.sin(angle);
    const topY = 0.85;
    const bottomX = 1.0 * Math.cos(angle);
    const bottomZ = 1.0 * Math.sin(angle);
    const bottomY = -0.85;

    // Calculate midpoint
    const midX = (topX + bottomX) / 2;
    const midZ = (topZ + bottomZ) / 2;
    const midY = (topY + bottomY) / 2;

    const adjustedRopeGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.7, 16);
    const rope = new THREE.Mesh(adjustedRopeGeometry, ropeMaterial);
    rope.position.set(midX, midY, midZ);

    // Rotate to align with endpoints
    const direction = new THREE.Vector3(
      bottomX - topX,
      bottomY - topY,
      bottomZ - topZ
    ).normalize();
    const axis = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction);
    rope.setRotationFromQuaternion(quaternion);

    rope.name = `Rope ${i + 1}`;
    group.add(rope);
  }

  // 4. Carved Patterns (Small Boxes on the Waist)
  const carvingGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.08); // Smaller for subtlety
  const carvingMaterial = new THREE.MeshStandardMaterial({ color: 0x704214 }); // Lighter wood tone
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = 0.4 * Math.cos(angle); // Adjusted for thicker waist (radius 0.4)
    const z = 0.4 * Math.sin(angle);
    const carving = new THREE.Mesh(carvingGeometry, carvingMaterial);
    carving.position.set(x, 0, z);
    carving.name = `Carving ${i + 1}`;
    group.add(carving);
  }

  // New Subtle Carvings (Replacing Yellow Rectangles)
  const detailGeometry = new THREE.BoxGeometry(0.06, 0.12, 0.02); // Smaller, simpler carvings
  const detailMaterial = new THREE.MeshStandardMaterial({ color: 0x704214 }); // Matching wood tone
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const x = 0.4 * Math.cos(angle); // Adjusted for thicker waist (radius 0.4)
    const z = 0.4 * Math.sin(angle);
    const detail1 = new THREE.Mesh(detailGeometry, detailMaterial);
    detail1.position.set(x, 0.15, z);
    detail1.rotation.x = Math.PI / 2;
    detail1.name = `Detail Upper ${i + 1}`;
    group.add(detail1);

    const detail2 = detail1.clone();
    detail2.position.set(x, -0.15, z);
    detail2.name = `Detail Lower ${i + 1}`;
    group.add(detail2);
  }

  // Center the group at (0, 0, 0)
  group.position.set(0, 0, 0);
  group.updateMatrixWorld();

  return group;
}