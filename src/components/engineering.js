export function renderEngineering() {
  return `
    <section class="section engineering-section" id="engineering-section">
      <div class="section-container">
        <div class="section-header reveal-on-scroll">
          <div class="section-tag">ANATOMY & GEOMETRY</div>
          <h2 class="section-title">ENGINEERED FOR ASPHALT & LEAN</h2>
          <p class="section-desc">
            Motorcycle tyres demand precision crown profiles, directional water-sipes, and progressive shoulder compounds to guarantee edge grip when committed into turns.
          </p>
        </div>

        <div class="engineering-grid stagger-cards">
          <div class="card-item engineering-card">
            <div class="card-badge">01 / GEOMETRY</div>
            <h3 class="card-title">Elliptical Crown Profile</h3>
            <p class="card-text">
              Unlike flat automotive tyres, high-performance motorcycle tyres use an aggressive parabolic crown radius to maximize the contact patch under lean angles exceeding 45 degrees.
            </p>
            <div class="tech-spec-bar">
              <span class="spec-label">Contact Patch Transition</span>
              <span class="spec-val">Progressive Dynamic</span>
            </div>
          </div>

          <div class="card-item engineering-card highlight-card">
            <div class="card-badge accent-badge">02 / TREAD SIPING</div>
            <h3 class="card-title">Directional Water Evacuation</h3>
            <p class="card-text">
              Strategically placed 3D lightning grooves displace standing surface water, preventing hydroplaning during heavy monsoon showers on Telangana state roads.
            </p>
            <div class="tech-spec-bar">
              <span class="spec-label">Displacement Efficiency</span>
              <span class="spec-val">Radial Micro-Sipes</span>
            </div>
          </div>

          <div class="card-item engineering-card">
            <div class="card-badge">03 / WHEEL INTERACTION</div>
            <h3 class="card-title">Rigid Alloy Bead Interface</h3>
            <p class="card-text">
              Reinforced casing plies maintain airtight bead retention on 17-inch and 19-inch alloy rims under extreme braking forces and thermal tyre expansion.
            </p>
            <div class="tech-spec-bar">
              <span class="spec-label">Bead Seating</span>
              <span class="spec-val">High-Pressure Tubeless</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
