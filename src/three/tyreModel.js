import * as THREE from 'three';

/**
 * Generates high-fidelity procedural PBR textures for the motorcycle tyre and wheel:
 * - Color map (vulcanized synthetic rubber + deep tread channels + sidewall typography)
 * - Bump map (channel depth and organic rubber micro-grain)
 * - Roughness map (matte crown contact patch vs satin sidewalls vs rough groove channels)
 * - Brake rotor map (concentric brushed steel with ventilation drill patterns)
 */
function createProceduralTextures() {
  const width = 1024;
  const height = 512;

  // -------------------------------------------------------------
  // 1. Height / Bump Canvas Texture
  // -------------------------------------------------------------
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d');

  // Neutral baseline 50% gray
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, width, height);

  // Micro-texture grain
  const bumpImg = bCtx.getImageData(0, 0, width, height);
  const bData = bumpImg.data;
  for (let i = 0; i < bData.length; i += 4) {
    const grain = (Math.random() - 0.5) * 6;
    bData[i] = Math.min(255, Math.max(0, bData[i] + grain));
    bData[i + 1] = Math.min(255, Math.max(0, bData[i + 1] + grain));
    bData[i + 2] = Math.min(255, Math.max(0, bData[i + 2] + grain));
  }
  bCtx.putImageData(bumpImg, 0, 0);

  // Sidewall bead concentric ribs
  bCtx.strokeStyle = '#959595';
  bCtx.lineWidth = 2;
  for (let y of [40, 44, 48, 464, 468, 472]) {
    bCtx.beginPath();
    bCtx.moveTo(0, y);
    bCtx.lineTo(width, y);
    bCtx.stroke();
  }

  // Helper to draw realistic directional sport-radial tread grooves
  function drawGrooves(ctx, strokeColors, primaryWidth = 14) {
    const repeats = 20;
    const step = width / repeats;

    for (const pass of strokeColors) {
      ctx.strokeStyle = pass.c;
      ctx.lineWidth = pass.w;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < repeats; i++) {
        const x = i * step;

        // Left shoulder sipe (curving outward from y:240 down to y:160)
        ctx.beginPath();
        ctx.moveTo(x + 8, 240);
        ctx.bezierCurveTo(x + 18, 215, x + 35, 185, x + 55, 160);
        ctx.stroke();

        // Left secondary micro-sipe
        ctx.lineWidth = Math.max(2, pass.w * 0.5);
        ctx.beginPath();
        ctx.moveTo(x + 28, 230);
        ctx.bezierCurveTo(x + 38, 210, x + 50, 190, x + 68, 175);
        ctx.stroke();
        ctx.lineWidth = pass.w;

        // Right shoulder sipe (staggered, curving from y:272 up to y:352)
        const xr = x + step * 0.5;
        ctx.beginPath();
        ctx.moveTo(xr + 8, 272);
        ctx.bezierCurveTo(xr + 18, 297, xr + 35, 327, xr + 55, 352);
        ctx.stroke();

        // Right secondary micro-sipe
        ctx.lineWidth = Math.max(2, pass.w * 0.5);
        ctx.beginPath();
        ctx.moveTo(xr + 28, 282);
        ctx.bezierCurveTo(xr + 38, 302, xr + 50, 322, xr + 68, 337);
        ctx.stroke();
        ctx.lineWidth = pass.w;
      }
    }
  }

  // Draw bump map sipes (height relief)
  drawGrooves(bCtx, [
    { w: 16, c: '#505050' },
    { w: 10, c: '#282828' },
    { w: 5,  c: '#080808' }
  ]);

  // Sidewall typography (raised in height map)
  bCtx.fillStyle = '#b8b8b8';
  bCtx.font = 'bold 16px "Chakra Petch", "Space Grotesk", sans-serif';
  bCtx.textAlign = 'center';
  bCtx.textBaseline = 'middle';

  for (let i = 0; i < 4; i++) {
    const xPos = (i + 0.5) * (width / 4);
    bCtx.fillText('MS TRACK TYRES • 120/70 ZR17 M/C (58W) • RADIAL', xPos, 80);
    bCtx.fillText('ROTATION ▶ • MAX LOAD 236 KG • HYPER-SPORT TUBELESS', xPos, 432);
  }

  // -------------------------------------------------------------
  // 2. Albedo / Color Map (Authentic deep vulcanized rubber)
  // -------------------------------------------------------------
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const cCtx = colorCanvas.getContext('2d');

  // Deep matte vulcanized charcoal black
  cCtx.fillStyle = '#16191f';
  cCtx.fillRect(0, 0, width, height);

  // Micro-speckle noise for organic rubber look
  const colorImg = cCtx.getImageData(0, 0, width, height);
  const cData = colorImg.data;
  for (let i = 0; i < cData.length; i += 4) {
    const grain = (Math.random() - 0.5) * 4;
    cData[i] = Math.min(255, Math.max(0, cData[i] + grain));
    cData[i + 1] = Math.min(255, Math.max(0, cData[i + 1] + grain));
    cData[i + 2] = Math.min(255, Math.max(0, cData[i + 2] + grain));
  }
  cCtx.putImageData(colorImg, 0, 0);

  // Sidewall bead concentric ribs
  cCtx.strokeStyle = '#1d2128';
  cCtx.lineWidth = 2;
  for (let y of [40, 44, 48, 464, 468, 472]) {
    cCtx.beginPath();
    cCtx.moveTo(0, y);
    cCtx.lineTo(width, y);
    cCtx.stroke();
  }

  // Draw deep shadow channels into tread grooves
  drawGrooves(cCtx, [
    { w: 14, c: '#0f1115' },
    { w: 8,  c: '#090a0d' },
    { w: 4,  c: '#050608' }
  ]);

  // Sidewall lettering contrast (subtle refined debossed slate)
  cCtx.fillStyle = '#3e4754';
  cCtx.font = 'bold 16px "Chakra Petch", "Space Grotesk", sans-serif';
  cCtx.textAlign = 'center';
  cCtx.textBaseline = 'middle';
  for (let i = 0; i < 4; i++) {
    const xPos = (i + 0.5) * (width / 4);
    cCtx.fillText('MS TRACK TYRES • 120/70 ZR17 M/C (58W) • RADIAL', xPos, 80);
    cCtx.fillText('ROTATION ▶ • MAX LOAD 236 KG • HYPER-SPORT TUBELESS', xPos, 432);
  }

  // -------------------------------------------------------------
  // 3. Roughness Map
  // -------------------------------------------------------------
  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = width;
  roughCanvas.height = height;
  const rCtx = roughCanvas.getContext('2d');

  const roughGrad = rCtx.createLinearGradient(0, 0, 0, height);
  roughGrad.addColorStop(0, '#888888');   // outer sidewall
  roughGrad.addColorStop(0.25, '#c5c5c5'); // shoulder
  roughGrad.addColorStop(0.5, '#e0e0e0');  // crown contact patch (high friction matte)
  roughGrad.addColorStop(0.75, '#c5c5c5'); // shoulder
  roughGrad.addColorStop(1, '#888888');   // inner sidewall
  rCtx.fillStyle = roughGrad;
  rCtx.fillRect(0, 0, width, height);

  // -------------------------------------------------------------
  // 4. Stainless Steel Brake Rotor Texture
  // -------------------------------------------------------------
  const rotorCanvas = document.createElement('canvas');
  rotorCanvas.width = 512;
  rotorCanvas.height = 512;
  const rotCtx = rotorCanvas.getContext('2d');

  rotCtx.fillStyle = '#cbd2dc';
  rotCtx.fillRect(0, 0, 512, 512);

  // Concentric machining rings
  for (let r = 120; r < 240; r += 2) {
    rotCtx.strokeStyle = `rgba(110, 120, 135, ${0.12 + Math.random() * 0.12})`;
    rotCtx.lineWidth = 1;
    rotCtx.beginPath();
    rotCtx.arc(256, 256, r, 0, Math.PI * 2);
    rotCtx.stroke();
  }

  // Spiral cross-drilled cooling holes
  rotCtx.fillStyle = '#14171d';
  const spokes = 12;
  for (let i = 0; i < spokes; i++) {
    const baseAngle = (i / spokes) * Math.PI * 2;
    for (let s = 0; s < 4; s++) {
      const dist = 145 + s * 22;
      const angle = baseAngle + (s * 0.05);
      const hx = 256 + Math.cos(angle) * dist;
      const hy = 256 + Math.sin(angle) * dist;
      rotCtx.beginPath();
      rotCtx.arc(hx, hy, 4, 0, Math.PI * 2);
      rotCtx.fill();
    }
  }

  // Construct Three.js Canvas Textures
  const colorTexture = new THREE.CanvasTexture(colorCanvas);
  colorTexture.wrapS = THREE.RepeatWrapping;
  colorTexture.wrapT = THREE.ClampToEdgeWrapping;

  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.ClampToEdgeWrapping;

  const roughnessTexture = new THREE.CanvasTexture(roughCanvas);
  roughnessTexture.wrapS = THREE.RepeatWrapping;
  roughnessTexture.wrapT = THREE.ClampToEdgeWrapping;

  const rotorTexture = new THREE.CanvasTexture(rotorCanvas);

  return { colorTexture, bumpTexture, roughnessTexture, rotorTexture };
}

/**
 * Builds the complete refined 3D Motorcycle Tyre & Wheel Assembly:
 * - Continuous, smooth parabolic rubber crown geometry.
 * - High-definition bump mapped directional sport sipes.
 * - Perfectly integrated forged alloy wheel with bead seat engagement.
 * - Sculpted 5-twin spoke star architecture with machined lightening pockets.
 * - Machined billet hub, axle spindle, and hex axle nut.
 * - Ventilated floating stainless steel brake rotor with race-gold carrier.
 */
export function createMotorcycleTyreAssembly() {
  const group = new THREE.Group();
  group.name = "MotorcycleTyreAssembly";

  const { colorTexture, bumpTexture, roughnessTexture, rotorTexture } = createProceduralTextures();

  // -------------------------------------------------------------
  // 1. TYRE CARCASS (Realistic Parabolic Motorcycle Crown Profile)
  // -------------------------------------------------------------
  const crownRadius = 3.20;    // Peak outer tyre center radius
  const beadRadius = 2.15;     // Inner bead rim radius
  const tyreHalfWidth = 0.82;  // 120 profile half width

  const tyrePoints = [];
  const profileSteps = 40;

  for (let i = 0; i <= profileSteps; i++) {
    const t = i / profileSteps;
    const angle = (t - 0.5) * Math.PI; // -PI/2 to +PI/2
    
    // Width position (along axle / Z axis)
    const z = Math.sin(angle) * tyreHalfWidth;

    // Radius position: parabolic continuous crown curve
    const cosVal = Math.cos(angle);
    const r = beadRadius + (crownRadius - beadRadius) * Math.pow(cosVal, 0.72);

    tyrePoints.push(new THREE.Vector2(r, z));
  }

  const tyreGeo = new THREE.LatheGeometry(tyrePoints, 64);
  tyreGeo.computeVertexNormals();

  const tyreMaterial = new THREE.MeshStandardMaterial({
    map: colorTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.06,
    roughnessMap: roughnessTexture,
    roughness: 0.82,
    metalness: 0.04,
    color: 0xffffff
  });

  const tyreMesh = new THREE.Mesh(tyreGeo, tyreMaterial);
  tyreMesh.rotation.x = Math.PI / 2; // Orient upright
  tyreMesh.castShadow = true;
  tyreMesh.receiveShadow = true;
  group.add(tyreMesh);

  // -------------------------------------------------------------
  // 2. FORGED ALLOY WHEEL RIM (Seamless Bead Engagement)
  // -------------------------------------------------------------
  const rimPoints = [
    new THREE.Vector2(2.22, 0.76), // Outer rim protective lip
    new THREE.Vector2(2.20, 0.72),
    new THREE.Vector2(2.15, 0.65), // Bead seating flange
    new THREE.Vector2(2.05, 0.58), // Safety hump
    new THREE.Vector2(1.96, 0.45), // Drop center shoulder
    new THREE.Vector2(1.90, 0.22), // Deep inner well center
    new THREE.Vector2(1.90, -0.22),
    new THREE.Vector2(1.96, -0.45),
    new THREE.Vector2(2.05, -0.58),
    new THREE.Vector2(2.15, -0.65),
    new THREE.Vector2(2.20, -0.72),
    new THREE.Vector2(2.22, -0.76)
  ];

  const rimGeo = new THREE.LatheGeometry(rimPoints, 48);
  rimGeo.computeVertexNormals();

  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x1c2026,
    roughness: 0.28,
    metalness: 0.84,
    envMapIntensity: 1.1
  });

  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  rimMesh.rotation.x = Math.PI / 2;
  rimMesh.castShadow = true;
  rimMesh.receiveShadow = true;
  group.add(rimMesh);

  // Restrained Motorsport Racing Red Accent Pinstripe
  const stripeGeo = new THREE.TorusGeometry(2.18, 0.012, 12, 64);
  const stripeMat = new THREE.MeshStandardMaterial({
    color: 0xe01b2e,
    roughness: 0.32,
    metalness: 0.5,
    emissive: 0x3d050a
  });

  const stripeL = new THREE.Mesh(stripeGeo, stripeMat);
  stripeL.position.z = 0.72;
  group.add(stripeL);

  const stripeR = new THREE.Mesh(stripeGeo, stripeMat);
  stripeR.position.z = -0.72;
  group.add(stripeR);

  // -------------------------------------------------------------
  // 3. SCULPTED 5-TWIN SPOKE ALLOY WHEEL ARCHITECTURE
  // -------------------------------------------------------------
  const spokesGroup = new THREE.Group();
  const spokeMat = new THREE.MeshStandardMaterial({
    color: 0x222730,
    roughness: 0.3,
    metalness: 0.86
  });

  const spokeCount = 5;
  for (let s = 0; s < spokeCount; s++) {
    const baseAngle = (s / spokeCount) * Math.PI * 2;

    for (const offset of [-0.075, 0.075]) {
      const spokeAngle = baseAngle + offset;
      const spokeLen = 1.30;

      const spokeGeo = new THREE.BoxGeometry(0.11, spokeLen, 0.16);
      const spoke = new THREE.Mesh(spokeGeo, spokeMat);

      const midRadius = 1.28;
      spoke.position.set(
        Math.cos(spokeAngle) * midRadius,
        Math.sin(spokeAngle) * midRadius,
        0
      );
      spoke.rotation.z = spokeAngle + Math.PI / 2;
      spoke.castShadow = true;
      spokesGroup.add(spoke);
    }

    const bridgeGeo = new THREE.BoxGeometry(0.18, 0.08, 0.14);
    const bridge = new THREE.Mesh(bridgeGeo, spokeMat);
    bridge.position.set(
      Math.cos(baseAngle) * 1.82,
      Math.sin(baseAngle) * 1.82,
      0
    );
    bridge.rotation.z = baseAngle + Math.PI / 2;
    spokesGroup.add(bridge);
  }
  group.add(spokesGroup);

  // -------------------------------------------------------------
  // 4. CENTRAL BILLET HUB & AXLE HARDWARE
  // -------------------------------------------------------------
  const hubGroup = new THREE.Group();

  const hubGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.82, 32);
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0x282e38,
    roughness: 0.28,
    metalness: 0.88
  });
  const hub = new THREE.Mesh(hubGeo, hubMat);
  hub.rotation.x = Math.PI / 2;
  hub.castShadow = true;
  hubGroup.add(hub);

  const collarGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.94, 24);
  const collarMat = new THREE.MeshStandardMaterial({
    color: 0x485260,
    roughness: 0.22,
    metalness: 0.92
  });
  const collar = new THREE.Mesh(collarGeo, collarMat);
  collar.rotation.x = Math.PI / 2;
  hubGroup.add(collar);

  const nutGeo = new THREE.CylinderGeometry(0.24, 0.26, 1.02, 6);
  const nutMat = new THREE.MeshStandardMaterial({
    color: 0x8a95a5,
    roughness: 0.18,
    metalness: 0.95
  });
  const nut = new THREE.Mesh(nutGeo, nutMat);
  nut.rotation.x = Math.PI / 2;
  hubGroup.add(nut);

  const boreGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.06, 16);
  const boreMat = new THREE.MeshStandardMaterial({
    color: 0x0a0c10,
    roughness: 0.9,
    metalness: 0.1
  });
  const bore = new THREE.Mesh(boreGeo, boreMat);
  bore.rotation.x = Math.PI / 2;
  hubGroup.add(bore);

  group.add(hubGroup);

  // -------------------------------------------------------------
  // 5. MOTORCYCLE FLOATING VENTILATED BRAKE ROTOR
  // -------------------------------------------------------------
  const rotorGroup = new THREE.Group();

  const rotorRingGeo = new THREE.RingGeometry(1.10, 1.70, 48);
  const rotorMat = new THREE.MeshStandardMaterial({
    color: 0xd8dfea,
    roughness: 0.22,
    metalness: 0.94,
    map: rotorTexture,
    bumpMap: rotorTexture,
    bumpScale: 0.015,
    side: THREE.DoubleSide
  });

  const rotorMesh = new THREE.Mesh(rotorRingGeo, rotorMat);
  rotorMesh.position.z = 0.38;
  rotorGroup.add(rotorMesh);

  const carrierGeo = new THREE.RingGeometry(0.66, 1.10, 12);
  const carrierMat = new THREE.MeshStandardMaterial({
    color: 0xba9248,
    roughness: 0.32,
    metalness: 0.85,
    side: THREE.DoubleSide
  });
  const carrierMesh = new THREE.Mesh(carrierGeo, carrierMat);
  carrierMesh.position.z = 0.378;
  rotorGroup.add(carrierMesh);

  const bobbinGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.06, 12);
  const bobbinMat = new THREE.MeshStandardMaterial({
    color: 0x14181f,
    roughness: 0.25,
    metalness: 0.92
  });

  for (let b = 0; b < 6; b++) {
    const angle = (b / 6) * Math.PI * 2;
    const bobbin = new THREE.Mesh(bobbinGeo, bobbinMat);
    bobbin.position.set(
      Math.cos(angle) * 1.10,
      Math.sin(angle) * 1.10,
      0.38
    );
    bobbin.rotation.x = Math.PI / 2;
    rotorGroup.add(bobbin);
  }

  const boltGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.04, 6);
  const boltMat = new THREE.MeshStandardMaterial({
    color: 0xa0acbe,
    roughness: 0.2,
    metalness: 0.95
  });

  for (let mb = 0; mb < 5; mb++) {
    const angle = (mb / 5) * Math.PI * 2;
    const bolt = new THREE.Mesh(boltGeo, boltMat);
    bolt.position.set(
      Math.cos(angle) * 0.76,
      Math.sin(angle) * 0.76,
      0.38
    );
    bolt.rotation.x = Math.PI / 2;
    rotorGroup.add(bolt);
  }

  group.add(rotorGroup);

  // Proportional scale
  group.scale.set(0.72, 0.72, 0.72);

  return {
    group,
    tyreMesh,
    update(delta, autoRotate = true, rotationSpeed = 0.35) {
      if (autoRotate) {
        group.rotation.y += delta * rotationSpeed;
      }
    }
  };
}
