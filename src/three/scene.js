import * as THREE from 'three';
import { createMotorcycleTyreAssembly } from './tyreModel.js';

export function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

export class TyreScene {
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
    this.rotationSpeed = 0.35;
    this.isUserInteracting = false;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Camera position and look-at targets for smooth interpolation
    this.targetCameraPos = new THREE.Vector3(0, 0.2, 7.2);
    this.targetCameraLook = new THREE.Vector3(0, 0, 0);
    this.currentCameraLook = new THREE.Vector3(0, 0, 0);

    // Subtle pointer parallax
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    
    this.animationFrameId = null;
    this.isVisible = true;
    this.resizeObserver = null;

    if (this.isWebGLAvailable && this.container) {
      this.init();
    } else if (this.container) {
      this.showFallback('3D Hardware Acceleration Unavailable');
    }
  }

  showFallback(message = '3D Hardware Acceleration Unavailable') {
    if (!this.container) return;
    const statusText = document.getElementById('explorer-status-text');
    const statusDot = document.getElementById('explorer-status-dot');
    if (statusText) statusText.textContent = '3D ACCELERATION OFFLINE';
    if (statusDot) {
      statusDot.style.background = '#f59e0b';
      statusDot.style.boxShadow = '0 0 8px #f59e0b';
    }

    this.container.innerHTML = `
      <div class="explorer-fallback-state" style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; text-align:center; padding:32px; z-index:2; position:relative;">
        <div style="width:60px; height:60px; border-radius:50%; border:2px dashed #ff283b; display:flex; align-items:center; justify-content:center; margin-bottom:16px; color:#ff283b; font-weight:700; font-family:var(--font-tech); font-size:1.1rem;">3D</div>
        <h4 style="font-family:var(--font-heading); font-size:1.125rem; margin-bottom:8px; color:var(--text-main);">${message}</h4>
        <p style="font-size:0.875rem; color:var(--text-muted); max-width:420px; margin-bottom:20px; line-height:1.5;">WebGL rendering could not be initialized on this display context. Tyre specifications and size catalogue remain fully operational.</p>
        <button class="btn btn-secondary btn-sm" id="btn-retry-3d" style="padding:8px 20px; font-size:0.8125rem;">Retry 3D Viewport</button>
      </div>
    `;
    const retryBtn = this.container.querySelector('#btn-retry-3d');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.container.innerHTML = `
          <div class="interaction-toast">
            <svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 15l-3 3-3-3m0-6l3-3 3 3m-6 3h12"/></svg>
            <span>Click & Drag to Orbit • Scroll or Pinch to Zoom</span>
          </div>
        `;
        this.init();
      });
    }
  }

  init() {
    // Get actual viewport dimensions from container
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(rect.width, 320);
    const height = Math.max(rect.height || this.container.clientHeight, 360);

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera: Framed with comfortable margin for motorcycle tyre proportions
    const aspect = width / height;
    const isMobile = width < 600;
    const fov = isMobile ? 42 : 36;
    const initialZ = isMobile ? 8.2 : 7.2;

    this.targetCameraPos.set(0, 0.2, initialZ);
    this.camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100);
    this.camera.position.copy(this.targetCameraPos);
    this.camera.lookAt(this.targetCameraLook);

    // 3. WebGL Renderer configured to fill viewport
    const maxDPR = isMobile ? 1.25 : 1.75;
    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.error('Failed to create WebGLRenderer:', e);
      this.showFallback('WebGL Context Creation Failed');
      return;
    }

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDPR));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Canvas styling to ensure it sits behind interaction overlays
    const canvas = this.renderer.domElement;
    canvas.className = 'explorer-three-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.pointerEvents = 'none'; // Clicks pass through to interaction area
    canvas.style.zIndex = '0';

    // Handle WebGL context loss gracefully
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      console.warn('WebGL context lost in explorer viewport');
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
    }, false);

    canvas.addEventListener('webglcontextrestored', () => {
      console.info('WebGL context restored in explorer viewport');
      this.init();
    }, false);

    this.container.appendChild(canvas);

    // 4. Studio Lighting setup
    this.setupLighting();

    // 5. Soft Ground Contact Shadow
    this.setupFloorShadow();

    // 6. 3D Motorcycle Tyre Model Assembly
    try {
      this.tyreAssembly = createMotorcycleTyreAssembly();
      // Default 3/4 sports viewing angle
      this.tyreAssembly.group.position.set(0, 0, 0);
      this.tyreAssembly.group.rotation.set(0.16, 0.52, 0.10);
      this.scene.add(this.tyreAssembly.group);
    } catch (err) {
      console.error('Failed to create motorcycle tyre assembly:', err);
      this.showFallback('3D Tyre Assembly Error');
      return;
    }

    // 7. Event Listeners & ResizeObserver
    this.setupResizeObserver();
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);

    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    // IntersectionObserver to pause auto-spin when scrolled out of view
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          this.isVisible = entry.isIntersecting && (document.visibilityState === 'visible');
        }
      }, { threshold: 0.05 });
      this.io.observe(this.container);
    }

    // 8. Start Rendering Loop and paint initial frame immediately
    this.render();
    this.forceRender();

    // 9. Post-reflow size calibration (ensures accurate aspect ratio after CSS layout settles)
    requestAnimationFrame(() => {
      if (this.container) {
        const r = this.container.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          this.handleResize(r.width, r.height);
        }
      }
    });

    // 10. Live telemetry status
    const statusText = document.getElementById('explorer-status-text');
    const statusDot = document.getElementById('explorer-status-dot');
    if (statusText) statusText.textContent = 'REALTIME 3D VIEWPORT • ACTIVE';
    if (statusDot) {
      statusDot.style.background = '#10b981';
      statusDot.style.boxShadow = '0 0 8px #10b981';
    }
  }

  setupLighting() {
    // Ambient light: Soft fill to prevent crushed blacks
    const ambientLight = new THREE.AmbientLight(0x181e28, 0.75);
    this.scene.add(ambientLight);

    // Key Light: Studio softbox from top-front-right
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(4.0, 5.0, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 18;
    keyLight.shadow.bias = -0.0004;
    this.scene.add(keyLight);

    // Rim Light: Sharp silhouette edge highlight from top-rear-left
    const rimLight = new THREE.DirectionalLight(0xb8d0f0, 2.2);
    rimLight.position.set(-5.0, 4.5, -4.0);
    this.scene.add(rimLight);

    // Fill Light: Low-angle dark-slate floor bounce
    const fillLight = new THREE.DirectionalLight(0x222a36, 0.6);
    fillLight.position.set(3.0, -3.0, 2.0);
    this.scene.add(fillLight);

    // Restrained Motorsport Racing Red Accent Light
    const racingRedLight = new THREE.PointLight(0xff2238, 1.5, 9, 2);
    racingRedLight.position.set(-3.2, -1.8, 2.0);
    this.scene.add(racingRedLight);

    // Overhead Crown Spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 0.9);
    spotLight.position.set(0, 5.5, 3.5);
    spotLight.angle = Math.PI / 4.5;
    spotLight.penumbra = 0.85;
    this.scene.add(spotLight);
  }

  setupFloorShadow() {
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 512;
    shadowCanvas.height = 512;
    const ctx = shadowCanvas.getContext('2d');

    const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 245);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.78)');
    grad.addColorStop(0.3, 'rgba(0, 0, 0, 0.48)');
    grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.14)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(7.2, 7.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });

    this.floorShadow = new THREE.Mesh(shadowGeo, shadowMat);
    this.floorShadow.rotation.x = -Math.PI / 2;
    this.floorShadow.position.set(0, -2.42, 0);
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
    const isMobile = width < 600;
    
    this.camera.aspect = width / height;
    this.camera.fov = isMobile ? 42 : 36;
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
    this.mouse.targetX = nx * 0.28;
    this.mouse.targetY = ny * 0.18;
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

    // Subtle parallax damping
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Smooth camera target interpolation
    this.camera.position.x += (this.targetCameraPos.x + this.mouse.x - this.camera.position.x) * 0.08;
    this.camera.position.y += (this.targetCameraPos.y + this.mouse.y - this.camera.position.y) * 0.08;
    this.camera.position.z += (this.targetCameraPos.z - this.camera.position.z) * 0.08;

    this.currentCameraLook.lerp(this.targetCameraLook, 0.08);
    this.camera.lookAt(this.currentCameraLook);

    // Rotate tyre assembly (only auto-spin if visible and not interacting)
    if (this.tyreAssembly && !this.reducedMotion) {
      if (this.autoRotate && !this.isUserInteracting && this.isVisible) {
        this.tyreAssembly.update(delta, true, this.rotationSpeed);
      }
    }

    this.renderer.render(this.scene, this.camera);
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
