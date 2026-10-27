export function renderExplorer() {
  return `
    <section class="section explorer-section" id="explorer-section">
      <div class="section-container">
        <div class="section-header reveal-on-scroll">
          <div class="section-tag">REALTIME 3D EXPLORER</div>
          <h2 class="section-title">INTERACTIVE 360° INSPECTOR</h2>
          <p class="section-desc">
            Directly examine tyre carcass curvature, tread depth, and alloy wheel architecture from any perspective.
          </p>
        </div>

        <!-- 3D Interactive HUD Card -->
        <div class="explorer-card reveal-on-scroll" id="explorer-hud-card">
          <!-- Live Telemetry Pill -->
          <div class="explorer-telemetry-header">
            <div class="telemetry-chip">
              <span class="live-dot" id="explorer-status-dot"></span>
              <span class="chip-text" id="explorer-status-text">REALTIME 3D VIEWPORT</span>
            </div>
            <div class="telemetry-info">
              <span id="explorer-telemetry-info">PROCEDURAL THREE.JS MOTORCYCLE ASSEMBLY</span>
            </div>
          </div>

          <!-- Interaction Canvas Target Zone -->
          <div class="explorer-viewport-interactive" id="explorer-interactive-area" role="region" aria-label="3D Tyre Interactive Viewer">
            <!-- Instruction Toast -->
            <div class="interaction-toast">
              <svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 15l-3 3-3-3m0-6l3-3 3 3m-6 3h12"/></svg>
              <span>Click & Drag to Orbit • Scroll or Pinch to Zoom</span>
            </div>
          </div>

          <!-- Explorer Control Bar -->
          <div class="explorer-controls-bar">
            <!-- Angle Presets -->
            <div class="control-group angle-presets">
              <span class="control-label">VIEW PRESETS:</span>
              <button class="btn-ctrl active" data-preset="default" id="btn-preset-default">3/4 Sports</button>
              <button class="btn-ctrl" data-preset="tread" id="btn-preset-tread">Tread Face</button>
              <button class="btn-ctrl" data-preset="side" id="btn-preset-side">Alloy Wheel</button>
              <button class="btn-ctrl" data-preset="dynamic" id="btn-preset-dynamic">Track Apex</button>
            </div>

            <!-- Zoom & State Actions -->
            <div class="control-group actions-group">
              <button class="btn-ctrl btn-icon" id="btn-zoom-in" title="Zoom In" aria-label="Zoom In">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              </button>
              <button class="btn-ctrl btn-icon" id="btn-zoom-out" title="Zoom Out" aria-label="Zoom Out">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              </button>
              <button class="btn-ctrl btn-icon active-toggle" id="btn-autorotate" title="Toggle Auto-Rotation" aria-label="Toggle Auto-Rotation">
                <svg class="icon-spin" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
                <span class="ctrl-text">Auto Spin</span>
              </button>
              <button class="btn-ctrl btn-icon" id="btn-reset-view" title="Reset Camera View" aria-label="Reset Camera View">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                <span class="ctrl-text">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initExplorerInteractions(controls) {
  if (!controls) return;

  const presetButtons = document.querySelectorAll('.angle-presets .btn-ctrl');
  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      presetButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const presetKey = btn.getAttribute('data-preset');
      controls.setPreset(presetKey);
    });
  });

  const zoomInBtn = document.getElementById('btn-zoom-in');
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => controls.zoomIn());
  }

  const zoomOutBtn = document.getElementById('btn-zoom-out');
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => controls.zoomOut());
  }

  const autoRotateBtn = document.getElementById('btn-autorotate');
  if (autoRotateBtn) {
    autoRotateBtn.addEventListener('click', () => {
      const isSpinning = controls.toggleAutoRotate();
      if (isSpinning) {
        autoRotateBtn.classList.add('active-toggle');
      } else {
        autoRotateBtn.classList.remove('active-toggle');
      }
    });
  }

  const resetBtn = document.getElementById('btn-reset-view');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      controls.resetView();
      presetButtons.forEach((b) => b.classList.remove('active'));
      const defaultBtn = document.getElementById('btn-preset-default');
      if (defaultBtn) defaultBtn.classList.add('active');
      if (autoRotateBtn) autoRotateBtn.classList.add('active-toggle');
    });
  }
}
