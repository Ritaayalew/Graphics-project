import * as THREE from 'three';

// Function to create the African Ceremonial Drum
export function createProduct() {
  const group = new THREE.Group();

  // Main Drum Body (Hourglass Shape - Two Cylinders and a Middle Section)
  const topHeadGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.3, 32);
  const drumMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const topHead = new THREE.Mesh(topHeadGeometry, drumMaterial);
  topHead.position.set(0, 0.65, 0);
  topHead.name = 'Drum Head Top'; // For raycasting
  group.add(topHead);

  const bottomHead = topHead.clone();
  bottomHead.position.set(0, -0.65, 0);
  bottomHead.name = 'Drum Head Bottom';
  group.add(bottomHead);

  const waistGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 32);
  const waist = new THREE.Mesh(waistGeometry, drumMaterial);
  waist.position.set(0, 0, 0);
  waist.name = 'Drum Waist';
  group.add(waist);

  // Tension Ropes (Cylinders)
  const ropeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.6, 16);
  const ropeMaterial = new THREE.MeshStandardMaterial({ color: 0xDAA520 });
  const ropePositions = [
    [0.6, 0, 0],  // Front
    [-0.6, 0, 0], // Back
    [0, 0, 0.6],  // Right
    [0, 0, -0.6]  // Left
  ];

  ropePositions.forEach((pos, index) => {
    const rope = new THREE.Mesh(ropeGeometry, ropeMaterial);
    rope.position.set(pos[0], 0, pos[2]);
    const angle = Math.atan2(pos[0], pos[2]);
    rope.rotation.x = Math.PI / 6;
    rope.name = `Rope ${index + 1}`;
    group.add(rope);
  });

  // Decorative Beads (Spheres)
  const beadGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  const beadMaterial = new THREE.MeshStandardMaterial({ color: 0xFF4500 });
  const beadPositions = [
    [0.6, 0.3, 0],  // Bead on front rope
    [-0.6, 0.3, 0], // Bead on back rope
  ];

  beadPositions.forEach((pos, index) => {
    const bead = new THREE.Mesh(beadGeometry, beadMaterial);
    bead.position.set(pos[0], pos[1], pos[2]);
    bead.name = `Bead ${index + 1}`;
    group.add(bead);
  });

  // Base Support (Box)
  const baseGeometry = new THREE.BoxGeometry(1.2, 0.2, 1.2);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.set(0, -0.95, 0);
  base.name = 'Base';
  group.add(base);

  // Center the group at (0, 0, 0)
  group.position.set(0, 0, 0);
  group.updateMatrixWorld();

  return group;
}