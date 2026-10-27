import * as THREE from 'three';
import { createMotorcycleTyreAssembly } from './tyreModel.js';
import { checkWebGLSupport } from './scene.js';

export class HeroTyreScene {
  constructor(containerElement) {
    this.container = containerElement;
    this.isWebGLAvailable = checkWebGLSupport();

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.tyreAssembly = null;
    this.floorShadow = null;
    this.clock = new THREE.Clock();

    this.autoRotate = true;
    this.rotationSpeed = 0.18;
    this.elapsedTime = 0;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.animationFrameId = null;
    this.isVisible = true;
    this.resizeObserver = null;
    this.io = null;

    // Composition state
    this.baseGroupY = 0;
    this.baseGroupX = 0.65;
    this.baseCamZ = 7.6;
    this.targetLookAt = new THREE.Vector3(0.45, 0, 0);

    if (this.isWebGLAvailable && this.container) {
      this.init();
    }
  }

  init() {
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(rect.width || this.container.clientWidth || window.innerWidth, 320);
    const height = Math.max(rect.height || this.container.clientHeight || window.innerHeight, 360);

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera: Telephoto commercial framing (fov 36 desktop / 42 mobile)
    const isMobile = window.innerWidth < 768;
    const aspect = width / height;
    const fov = isMobile ? 42 : 36;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100);

    this.calibrateFraming(isMobile);
    this.camera.position.set(0, 0, this.baseCamZ);
    this.camera.lookAt(this.targetLookAt);

    // 3. WebGL Renderer
    const maxDPR = isMobile ? 1.25 : 1.75;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDPR));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    const canvas = this.renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.pointerEvents = 'none';

    this.container.appendChild(canvas);

    // 4. Cinematic Lighting ("Antigravity" Showcase)
    this.setupLighting();

    // 5. Contact Floor Shadow
    this.setupFloorShadow();

    // 6. Tyre Model Assembly (Hero scale: fills 70–80% viewport height)
    this.tyreAssembly = createMotorcycleTyreAssembly();
    // Scale slightly to ensure bold, dominant hero presence
    this.tyreAssembly.group.scale.setScalar(1.06);
    this.tyreAssembly.group.position.set(this.baseGroupX, this.baseGroupY, 0);

    // Dramatic 3/4 heroic pitch
    this.basePitchX = 0.16;
    this.baseYawY = 0.50;
    this.baseRollZ = 0.08;
    this.tyreAssembly.group.rotation.set(this.basePitchX, this.baseYawY, this.baseRollZ);

    this.scene.add(this.tyreAssembly.group);

    // 7. Event Listeners & Observers
    this.setupResizeObserver();
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);

    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    // Pause rendering when scrolled out of view, wake up and force render on return
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          this.isVisible = entry.isIntersecting && (document.visibilityState === 'visible');
          if (this.isVisible) {
            this.forceRender();
          }
        }
      }, { threshold: 0.02 });
      this.io.observe(this.container);
    }

    // 8. Start Unified Animation Loop
    this.render();
  }

  calibrateFraming(isMobile) {
    if (isMobile) {
      // Mobile (<768px): Center horizontally (x: 0), elevate into upper 65% of viewport
      this.baseGroupX = 0;
      this.baseGroupY = 0.95;
      this.baseCamZ = 10.2;
      this.targetLookAt.set(0, 0.72, 0);

      if (this.tyreAssembly) {
        this.tyreAssembly.group.scale.setScalar(0.88);
      }
      if (this.floorShadow) {
        this.floorShadow.scale.setScalar(0.88);
        this.floorShadow.position.set(0, -0.92, 0);
      }
    } else {
      // Desktop: Offset right of center (+0.65 in world units), dramatic 3/4 heroic pitch
      // Fills 72-76% of vertical viewport without clipping top or bottom tread edges
      this.baseGroupX = 0.65;
      this.baseGroupY = 0.0;
      this.baseCamZ = 8.2;
      this.targetLookAt.set(0.48, 0.0, 0);

      if (this.tyreAssembly) {
        this.tyreAssembly.group.scale.setScalar(1.0);
      }
      if (this.floorShadow) {
        this.floorShadow.scale.setScalar(1.0);
        this.floorShadow.position.set(this.baseGroupX, -2.25, 0);
      }
    }

    if (this.tyreAssembly) {
      this.tyreAssembly.group.position.x = this.baseGroupX;
      this.tyreAssembly.group.position.y = this.baseGroupY;
    }
  }

  setupLighting() {
    // 1. Low ambient light for high contrast
    const ambientLight = new THREE.AmbientLight(0x06080e, 0.40);
    this.scene.add(ambientLight);

    // 2. Cool white/silver key light (#f8fafc) highlighting rubber texture & lettering
    const keyLight = new THREE.DirectionalLight(0xf8fafc, 2.2);
    keyLight.position.set(4.2, 4.6, 4.4);
    this.scene.add(keyLight);

    // 3. Sharp racing-red rim/back light (#ef4444) grazing tread edge from behind
    const redRimLight = new THREE.DirectionalLight(0xef4444, 4.5);
    redRimLight.position.set(-5.0, 3.4, -4.2);
    this.scene.add(redRimLight);

    // 4. Secondary sharp red backlight grazing opposite shoulder
    const redBackLight = new THREE.DirectionalLight(0xdc2626, 2.8);
    redBackLight.position.set(2.0, 4.0, -4.5);
    this.scene.add(redBackLight);

    // 5. Grazing red point light for ambient sidewall glow
    const redAccentPoint = new THREE.PointLight(0xdc2626, 2.6, 12, 1.6);
    redAccentPoint.position.set(-3.2, -1.8, 1.2);
    this.scene.add(redAccentPoint);

    // 6. Fill light for alloy wheel spokes and rotor depth
    const fillLight = new THREE.DirectionalLight(0x1a2230, 0.7);
    fillLight.position.set(2.8, -2.5, 2.5);
    this.scene.add(fillLight);

    // 7. Top-down commercial spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 1.2);
    spotLight.position.set(0.6, 6.2, 3.5);
    spotLight.angle = Math.PI / 4.2;
    spotLight.penumbra = 0.8;
    this.scene.add(spotLight);
  }

  setupFloorShadow() {
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 512;
    shadowCanvas.height = 512;
    const ctx = shadowCanvas.getContext('2d');

    const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 245);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.82)');
    grad.addColorStop(0.3, 'rgba(0, 0, 0, 0.52)');
    grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.16)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(7.6, 7.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });

    this.floorShadow = new THREE.Mesh(shadowGeo, shadowMat);
    this.floorShadow.rotation.x = -Math.PI / 2;
    this.floorShadow.position.set(this.baseGroupX, -2.42, 0);
    this.scene.add(this.floorShadow);
  }

  setupResizeObserver() {
    if ('ResizeObserver' in window && this.container) {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            this.handleResize(width, height);
          }
        }
      });
      this.resizeObserver.observe(this.container);
    } else {
      window.addEventListener('resize', () => {
        if (this.container) {
          const rect = this.container.getBoundingClientRect();
          this.handleResize(rect.width, rect.height || this.container.clientHeight);
        }
      });
    }
  }

  handleResize(width, height) {
    if (!this.renderer || !this.camera) return;
    const isMobile = window.innerWidth < 768;

    this.camera.aspect = width / height;
    this.camera.fov = isMobile ? 42 : 36;
    this.calibrateFraming(isMobile);
    this.camera.updateProjectionMatrix();

    const maxDPR = isMobile ? 1.25 : 1.75;
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDPR));
    this.forceRender();
  }

  onMouseMove(e) {
    if (this.reducedMotion) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    this.mouse.targetX = nx * 0.35;
    this.mouse.targetY = ny * 0.22;
  }

  onVisibilityChange() {
    this.isVisible = document.visibilityState === 'visible';
    if (this.isVisible) {
      this.forceRender();
    }
  }

  forceRender() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  render() {
    this.animationFrameId = requestAnimationFrame(() => this.render());

    const delta = Math.min(this.clock.getDelta(), 0.1);
    this.elapsedTime += delta;

    // Weightless sinusoidal hover (antigravity float)
    const hoverY = this.reducedMotion ? 0 : Math.sin(this.elapsedTime * 1.2) * 0.08;

    if (this.tyreAssembly) {
      this.tyreAssembly.group.position.y = this.baseGroupY + hoverY;

      // Axial continuous rotation
      if (!this.reducedMotion && this.autoRotate && this.isVisible) {
        this.tyreAssembly.update(delta, true, this.rotationSpeed);
      }
    }

    if (this.floorShadow && !this.reducedMotion) {
      this.floorShadow.scale.setScalar(1 + hoverY * 0.35);
      this.floorShadow.material.opacity = 0.82 - hoverY * 0.25;
    }

    // Damped pointer parallax tracking
    this.mouse.x = THREE.MathUtils.lerp(this.mouse.x, this.mouse.targetX, 0.05);
    this.mouse.y = THREE.MathUtils.lerp(this.mouse.y, this.mouse.targetY, 0.05);

    const parallaxX = this.reducedMotion ? 0 : this.mouse.x * 0.35;
    const parallaxY = this.reducedMotion ? 0 : this.mouse.y * 0.25;

    this.camera.position.x = parallaxX;
    this.camera.position.y = parallaxY;
    this.camera.position.z = this.baseCamZ;
    this.camera.lookAt(this.targetLookAt.x, this.targetLookAt.y, this.targetLookAt.z);

    if (this.isVisible) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.io) {
      this.io.disconnect();
    }
    window.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.renderer && this.renderer.domElement) {
      this.renderer.dispose();
      if (this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}
