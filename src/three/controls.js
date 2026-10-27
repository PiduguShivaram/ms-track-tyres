import * as THREE from 'three';
import gsap from 'gsap';

export class TyreExplorerControls {
  constructor(tyreScene, interactionElement) {
    this.tyreScene = tyreScene;
    this.element = interactionElement;

    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0 };
    this.touchStartDistance = 0;

    // View Angle Presets (Framed to show tyre with sensible margin in explorer viewport)
    this.presets = {
      default: {
        cameraPos: { x: 0, y: 0.2, z: 7.2 },
        tyreRot: { x: 0.16, y: 0.52, z: 0.10 }
      },
      tread: {
        cameraPos: { x: 0, y: 0, z: 5.6 },
        tyreRot: { x: 0, y: Math.PI / 2, z: 0 }
      },
      side: {
        cameraPos: { x: 0, y: 0, z: 6.6 },
        tyreRot: { x: 0, y: 0, z: 0 }
      },
      dynamic: {
        cameraPos: { x: 0.8, y: 0.5, z: 6.8 },
        tyreRot: { x: 0.32, y: -0.62, z: -0.12 }
      }
    };

    this.initEvents();
  }

  initEvents() {
    if (!this.element) return;

    // Unified pointer events for mouse and touch drag rotation
    this.element.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerup', () => this.onPointerUp());
    window.addEventListener('pointercancel', () => this.onPointerUp());

    // Wheel zoom
    this.element.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });

    // Touch pinch zoom
    this.element.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
    this.element.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    this.element.addEventListener('touchend', () => { this.touchStartDistance = 0; });
  }

  onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    this.isDragging = true;
    this.tyreScene.isUserInteracting = true;
    this.previousMousePosition = { x: e.clientX, y: e.clientY };
    this.rotationVelocity = { x: 0, y: 0 };
    this.element.style.cursor = 'grabbing';
  }

  onPointerMove(e) {
    if (!this.isDragging || !this.tyreScene.tyreAssembly) return;

    const deltaX = e.clientX - this.previousMousePosition.x;
    const deltaY = e.clientY - this.previousMousePosition.y;

    const rotSensitivity = 0.007;
    const tyreGroup = this.tyreScene.tyreAssembly.group;

    tyreGroup.rotation.y += deltaX * rotSensitivity;
    tyreGroup.rotation.x = Math.max(-0.85, Math.min(0.85, tyreGroup.rotation.x + deltaY * rotSensitivity));

    this.rotationVelocity = {
      x: deltaY * rotSensitivity,
      y: deltaX * rotSensitivity
    };

    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  onPointerUp() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.tyreScene.isUserInteracting = false;
    this.element.style.cursor = 'grab';
  }

  onWheel(e) {
    if (!this.element.contains(e.target)) return;
    e.preventDefault();

    const zoomSpeed = 0.003;
    const currentZ = this.tyreScene.targetCameraPos.z;
    const newZ = Math.max(4.5, Math.min(10.5, currentZ + e.deltaY * zoomSpeed));
    this.tyreScene.targetCameraPos.z = newZ;
  }

  onTouchStart(e) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      this.touchStartDistance = Math.hypot(dx, dy);
    }
  }

  onTouchMove(e) {
    if (e.touches.length === 2 && this.touchStartDistance > 0) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const diff = this.touchStartDistance - dist;

      const currentZ = this.tyreScene.targetCameraPos.z;
      const newZ = Math.max(4.5, Math.min(10.5, currentZ + diff * 0.015));
      this.tyreScene.targetCameraPos.z = newZ;

      this.touchStartDistance = dist;
    }
  }

  zoomIn() {
    const currentZ = this.tyreScene.targetCameraPos.z;
    this.tyreScene.targetCameraPos.z = Math.max(4.5, currentZ - 0.7);
    this.tyreScene.isVisible = true;
    this.tyreScene.forceRender();
  }

  zoomOut() {
    const currentZ = this.tyreScene.targetCameraPos.z;
    this.tyreScene.targetCameraPos.z = Math.min(10.5, currentZ + 0.7);
    this.tyreScene.isVisible = true;
    this.tyreScene.forceRender();
  }

  toggleAutoRotate() {
    this.tyreScene.autoRotate = !this.tyreScene.autoRotate;
    this.tyreScene.isVisible = true;
    this.tyreScene.forceRender();
    return this.tyreScene.autoRotate;
  }

  setPreset(presetKey) {
    const preset = this.presets[presetKey] || this.presets.default;
    if (!this.tyreScene.tyreAssembly) return;

    this.tyreScene.isVisible = true;
    const group = this.tyreScene.tyreAssembly.group;

    gsap.to(this.tyreScene.targetCameraPos, {
      x: preset.cameraPos.x,
      y: preset.cameraPos.y,
      z: preset.cameraPos.z,
      duration: 1.0,
      ease: 'power2.out',
      onUpdate: () => {
        if (this.tyreScene) this.tyreScene.forceRender();
      }
    });

    gsap.to(group.rotation, {
      x: preset.tyreRot.x,
      y: preset.tyreRot.y,
      z: preset.tyreRot.z,
      duration: 1.0,
      ease: 'power2.out',
      onUpdate: () => {
        if (this.tyreScene) this.tyreScene.forceRender();
      }
    });
  }

  resetView() {
    this.setPreset('default');
    this.tyreScene.autoRotate = true;
    this.tyreScene.isVisible = true;
    this.tyreScene.forceRender();
  }
}
