import * as THREE from 'three';

// Function to create the African Ceremonial Drum (Yoruba Dundun) with Teddy Bear
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
  const bandMaterial = new THREE.MeshStandardMaterial({ color: 0xAD0D00 }); // Lighter wood tone
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
  const topSkinGeometry = new THREE.CylinderGeometry(1.0, 1.0, 0.02, 16);
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
  const numRopes = 16;
  for (let i = 0; i < numRopes; i++) {
    const angle = (i / numRopes) * Math.PI * 2;
    const topX = 1.0 * Math.cos(angle); // Edge of drumhead (radius 1.0)
    const topZ = 1.0 * Math.sin(angle);
    const topY = 0.85;
    const bottomX = 1.0 * Math.cos(angle);
    const bottomZ = 1.0 * Math.sin(angle);
    const bottomY = -0.85;

    const midX = (topX + bottomX) / 2;
    const midZ = (topZ + bottomZ) / 2;
    const midY = (topY + bottomY) / 2;

    const adjustedRopeGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.7, 16);
    const rope = new THREE.Mesh(adjustedRopeGeometry, ropeMaterial);
    rope.position.set(midX, midY, midZ);

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

  // 5. Realistic Teddy Bear with Adjusted Features
  const bearMaterial = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 }); // Very light gray for bear

  // Body (Spherical Abdomen)
  const bodyGeometry = new THREE.SphereGeometry(0.38, 16, 16);
  const body = new THREE.Mesh(bodyGeometry, bearMaterial);
  body.position.set(0, 1.125, 0); // Seated on drum
  group.add(body);

  // Head
  const headGeometry = new THREE.SphereGeometry(0.35, 16, 16);
  const head = new THREE.Mesh(headGeometry, bearMaterial);
  head.position.set(0, 1.65, 0); // Raised to be fully visible
  head.rotation.x = Math.PI / 18; // Slight tilt for cuteness
  group.add(head);

  // Snout
  const snoutGeometry = new THREE.SphereGeometry(0.06, 16, 17);
  const snout = new THREE.Mesh(snoutGeometry, bearMaterial);
  snout.position.set(0, 1.68, 0.25); // Protruding from head
  group.add(snout);

  // Eyes
  const eyeGeometry = new THREE.SphereGeometry(0.05, 18, 18);
  const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black eyes
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.12, 1.7, 0.28); // Adjusted for larger head
  group.add(leftEye);

  const rightEye = leftEye.clone();
  rightEye.position.set(0.12, 1.7, 0.28);
  group.add(rightEye);

  // Nose (Spherical Like Eyes)
  const noseGeometry = new THREE.SphereGeometry(0.06, 16, 17);
  const noseMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black nose
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.position.set(0, 1.65, 0.31); // Centered, matching eye style
  group.add(nose);

  // Smile (Curved Geometry)
  const smileGeometry = new THREE.TorusGeometry(0.08, 0.01, 8, 18, Math.PI); // Half-circle for smile
  const smileMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black smile
  const smile = new THREE.Mesh(smileGeometry, smileMaterial);
  smile.position.set(0, 1.56, 0.29); // Below nose
  smile.rotation.x = Math.PI / 2; // Rotate to face forward
  group.add(smile);

  // Arms (Hands with Curvy Ends Connected)
  const armGeometry = new THREE.CylinderGeometry(0.09, 0.12, 0.48, 16); // Slightly longer
  const leftArm = new THREE.Mesh(armGeometry, bearMaterial);
  leftArm.position.set(-0.36, 1.35, 0); // Start at body's surface
  leftArm.rotation.z = Math.PI / 4; // Increased inward tilt
  group.add(leftArm);

  const rightArm = leftArm.clone();
  rightArm.position.set(0.36, 1.35, 0);
  rightArm.rotation.z = -Math.PI / 4;
  group.add(rightArm);

  // Arm Ends (Rounded Paws Connected at End)
  const pawGeometry = new THREE.SphereGeometry(0.12, 14, 14);
  const leftArmPaw = new THREE.Mesh(pawGeometry, bearMaterial);
  leftArmPaw.position.set(-0.47, 1.46, 0); // Connected at arm's end
  group.add(leftArmPaw);

  const rightArmPaw = leftArmPaw.clone();
  rightArmPaw.position.set(0.47, 1.46, 0);
  group.add(rightArmPaw);

  // Legs (Connected Like Hands, Above Drum)
  const legGeometry = new THREE.CylinderGeometry(0.09, 0.16, 0.4, 16); // Adjusted length
  const leftLeg = new THREE.Mesh(legGeometry, bearMaterial);
  leftLeg.position.set(-0.32, 1.0, 0.15); // Start above drum at body's surface
  leftLeg.rotation.x = Math.PI / 2; // Forward tilt
  leftLeg.rotation.z = Math.PI / 6; // Increased inward tilt
  group.add(leftLeg);

  const rightLeg = leftLeg.clone();
  rightLeg.position.set(0.32, 1.0, 0.15);
  rightLeg.rotation.z = -Math.PI / 8;
  group.add(rightLeg);

  // Leg Ends (Rounded Feet Connected)
  const footGeometry = new THREE.SphereGeometry(0.12, 16, 16);
  const leftFoot = new THREE.Mesh(footGeometry, bearMaterial);
  leftFoot.position.set(-0.36, 0.992, 0.28); // Connected at leg's end, on drum top
  group.add(leftFoot);

  const rightFoot = leftFoot.clone();
  rightFoot.position.set(0.36, 0.992, 0.28);
  group.add(rightFoot);

  // Ears
  const earGeometry = new THREE.SphereGeometry(0.16, 14, 14); // Full sphere, bigger
  const leftEar = new THREE.Mesh(earGeometry, bearMaterial);
  leftEar.position.set(-0.31, 1.82, 0.02); // More protruding from sides
  leftEar.rotation.x = Math.PI / 4;
  group.add(leftEar);

  const rightEar = leftEar.clone();
  rightEar.position.set(0.31, 1.82, 0.02);
  group.add(rightEar);

  // 6. African Accessories
  // Beaded Necklace
  const beadGeometry = new THREE.SphereGeometry(0.03, 16, 16);
  const beadMaterial = new THREE.MeshStandardMaterial({ color: 0xFF4500 }); // Red beads
  const stringGeometry = new THREE.TorusGeometry(0.4, 0.01, 16, 32);
  const stringMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00 }); // Yellow string
  const necklaceString = new THREE.Mesh(stringGeometry, stringMaterial);
  necklaceString.position.set(0, 1.6, 0);
  necklaceString.rotation.x = Math.PI / 2;
  group.add(necklaceString);

  const numBeads = 12;
  for (let i = 0; i < numBeads; i++) {
    const angle = (i / numBeads) * Math.PI * 2;
    const beadX = 0.4 * Math.cos(angle);
    const beadZ = 0.4 * Math.sin(angle);
    const bead = new THREE.Mesh(beadGeometry, beadMaterial);
    bead.position.set(beadX, 1.6, beadZ);
    group.add(bead);

    // Add green beads alternating
    if (i % 2 === 0) {
      const greenBead = new THREE.Mesh(beadGeometry, new THREE.MeshStandardMaterial({ color: 0x008000 }));
      greenBead.position.set(beadX, 1.58, beadZ);
      group.add(greenBead);
    }
  }

  // Tribal Wristbands
  const wristbandGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.03, 32);
  const wristbandMaterial = new THREE.MeshStandardMaterial({ color: 0xDAA520 }); // Goldish tone
  const leftWristband = new THREE.Mesh(wristbandGeometry, wristbandMaterial);
  leftWristband.position.set(-0.36, 1.35, 0);
  group.add(leftWristband);

  const rightWristband = leftWristband.clone();
  rightWristband.position.set(0.36, 1.35, 0);
  group.add(rightWristband);

  // Anklets
  const ankletGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.03, 32);
  const ankletMaterial = new THREE.MeshStandardMaterial({ color: 0xDAA520 }); // Goldish tone
  const leftAnklet = new THREE.Mesh(ankletGeometry, ankletMaterial);
  leftAnklet.position.set(-0.32, 1.0, 0.15);
  group.add(leftAnklet);

  const rightAnklet = leftAnklet.clone();
  rightAnklet.position.set(0.32, 1.0, 0.15);
  group.add(rightAnklet);

  // Center the group at (0, 0, 0)
  group.position.set(0, 0, 0);
  group.updateMatrixWorld();

  return group;
}