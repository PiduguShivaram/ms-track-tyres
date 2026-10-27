import { BUSINESS_CONFIG } from '../config.js';

const BRAND_PHOTOS = {
  mrf: "/images/brands/mrf.webp",
  apollo: "/images/brands/apollo.webp",
  ceat: "/images/brands/ceat.webp",
  tvs: "/images/brands/tvs.webp",
  michelin: "/images/brands/michelin.webp",
  pirelli: "/images/brands/pirelli.webp",
  metzeler: "/images/brands/metzeler.webp",
  maxxis: "/images/brands/maxxis.webp"
};

export function renderBrands() {
  return `
    <section class="section brands-section" id="brands-section">
      <div class="section-container">
        <div class="section-header reveal-on-scroll">
          <div class="section-tag">PERFORMANCE BRANDS</div>
          <h2 class="section-title">BRANDS STOCKED<span class="accent-period">.</span></h2>
          <p class="section-desc">
            Motorcycle tyres from leading domestic and international manufacturers.
          </p>
        </div>

        <!-- Brand Cards Grid -->
        <div class="brands-grid stagger-cards">
          ${BUSINESS_CONFIG.brands.map(brand => {
            const photo = BRAND_PHOTOS[brand.id] || "/images/brands/mrf.webp";
            return `
              <div class="card-item brand-card ${brand.isVerified ? 'brand-verified' : 'brand-candidate'}">
                <div class="brand-photo-stage">
                  <img src="${photo}" alt="${brand.name} motorcycle tyre fitment" class="brand-tyre-img" loading="lazy" />
                  <span class="brand-badge-pill">${brand.name}</span>
                </div>

                <div class="brand-card-content">
                  <div class="brand-card-header">
                    <span class="brand-category-tag">${brand.category}</span>
                    <span class="brand-status-tag ${brand.isVerified ? 'status-verified' : 'status-pending'}">
                      ${brand.statusBadge}
                    </span>
                  </div>

                  <div class="brand-models">
                    <span class="models-label">Popular Series:</span>
                    <span class="models-inline">${brand.popularModels.join(' • ')}</span>
                  </div>

                  <div class="brand-card-footer">
                    <a href="https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent(`Hello MS TRACK TYRES, I would like to enquire about ${brand.name} motorcycle tyres available at your Pedapally shop.`)}" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="btn-brand-enquire"
                       aria-label="Enquire about ${brand.name} on WhatsApp">
                      <span>Enquire ${brand.name}</span>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Verification Disclaimer -->
        <div class="brands-disclaimer reveal-on-scroll">
          <div class="disclaimer-icon">ℹ</div>
          <p class="disclaimer-text">
            Stock availability varies based on daily consignments at our Pedapally workshop. Tap enquire to verify same-day availability.
          </p>
        </div>
      </div>
    </section>
  `;
}
