import { BUSINESS_CONFIG } from '../config.js';

export function renderHero() {
  return `
    <header class="hero-section hero-photo-dominant" id="hero-section">
      <!-- 1. Dominant Product Photography Stage (65–80% visual emphasis) -->
      <div class="hero-stage" aria-label="MS TRACK TYRES Featured Product Photography">
        <picture class="hero-picture">
          <source srcset="/images/hero/hero-bike-tyre.webp" type="image/webp" />
          <img 
            src="/images/hero/hero-bike-tyre.webp" 
            alt="High-performance motorcycle sport tyre mounted on rear wheel on Telangana road - MS TRACK TYRES Peddapalli" 
            class="hero-photo-img" 
            loading="eager" 
            fetchpriority="high"
          />
        </picture>
        <div class="hero-photo-vignette" aria-hidden="true"></div>
        <div class="hero-photo-badge">
          <span class="pulse-dot"></span>
          <span>GENUINE SHOP FITMENT • PEDAPALLY</span>
        </div>
      </div>

      <!-- 2. Clean, Restrained Brand & Action Overlay -->
      <div class="hero-content-wrapper">
        <div class="hero-content-card">
          <div class="hero-brand-header">
            <img 
              src="${BUSINESS_CONFIG.logo.src}" 
              alt="${BUSINESS_CONFIG.logo.alt}" 
              class="hero-logo-img" 
              width="180" 
              height="58"
            />
          </div>

          <h1 class="hero-title">
            FIND YOUR GRIP<span class="accent-period">.</span>
          </h1>

          <p class="hero-subtitle">
            Motorcycle tyres for every ride.
          </p>

          <div class="hero-actions">
            <a href="#catalogue-section" class="btn btn-hero-primary" id="btn-hero-explore">
              <span>EXPLORE TYRES</span>
              <svg class="icon-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#contact-section" class="btn btn-hero-ghost" id="btn-hero-contact">
              <span>CONTACT US</span>
            </a>
          </div>

          <div class="hero-wa-pill">
            <a href="https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsapp.generalEnquiry)}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="hero-wa-link"
               aria-label="Direct WhatsApp Enquiry to 7569512495">
              <svg class="icon-wa" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Quick WhatsApp Enquiry: <strong>7569512495</strong></span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}
