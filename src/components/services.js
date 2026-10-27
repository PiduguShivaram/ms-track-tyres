import { BUSINESS_CONFIG } from '../config.js';

const SERVICE_PHOTOS = {
  fitting: "/images/services/service-fitting-racks.webp",
  performance: "/images/services/service-performance-sourcing.webp",
  puncture: "/images/services/service-puncture-repair.webp",
  advisory: "/images/services/service-wheel-balancing.webp"
};

export function renderServices() {
  const confirmedServices = BUSINESS_CONFIG.services.filter(s => s.confirmed);

  return `
    <section class="section services-section" id="services-section">
      <div class="section-container">
        <div class="section-header reveal-on-scroll">
          <div class="section-tag">WORKSHOP SERVICES</div>
          <h2 class="section-title">SERVICES & FITMENT<span class="accent-period">.</span></h2>
          <p class="section-desc">
            Professional tyre mounting, balancing, and puncture repair at Peddapalli workshop.
          </p>
        </div>

        <div class="services-photo-grid stagger-cards">
          ${confirmedServices.map((service, index) => {
            const photo = SERVICE_PHOTOS[service.id] || "/images/services/service-fitting-racks.webp";
            return `
              <article class="service-photo-card">
                <div class="service-photo-stage">
                  <img src="${photo}" alt="${service.title} - MS TRACK TYRES Peddapalli" class="service-img" loading="lazy" />
                  <span class="service-index-badge">0${index + 1}</span>
                </div>
                <div class="service-card-body">
                  <h3 class="service-title">${service.title}</h3>
                  <p class="service-text">${service.description}</p>
                  <div class="service-footer">
                    <a href="https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent(`Hello MS TRACK TYRES, I would like to book or enquire about ${service.title} at your Pedapally workshop.`)}" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="service-link"
                       aria-label="Enquire about ${service.title} on WhatsApp">
                      <span>Book on WhatsApp</span>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                  </div>
                </div>
              </article>
            `;
          }).join('')}
        </div>

        <div class="services-notice reveal-on-scroll">
          <span>⚙️ All fitting and wheel services performed on-site in Peddapalli with rim protection tooling.</span>
        </div>
      </div>
    </section>
  `;
}
