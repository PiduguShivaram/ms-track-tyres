import { BUSINESS_CONFIG } from '../config.js';

export function renderNavbar() {
  return `
    <nav class="site-nav" id="main-nav" aria-label="Main Navigation">
      <div class="nav-container">
        <a href="#hero-section" class="nav-brand" aria-label="MS TRACK TYRES Home">
          <img src="${BUSINESS_CONFIG.logo.src}" alt="${BUSINESS_CONFIG.logo.alt}" class="nav-logo-img" width="130" height="42" />
        </a>

        <div class="nav-menu" id="nav-menu">
          <a href="#hero-section" class="nav-link">Home</a>
          <a href="#gallery-section" class="nav-link">Tyre Gallery</a>
          <a href="#search-section" class="nav-link">Find Size</a>
          <a href="#catalogue-section" class="nav-link">Catalogue</a>
          <a href="#brands-section" class="nav-link">Brands</a>
          <a href="#services-section" class="nav-link">Services</a>
          <a href="#contact-section" class="nav-link">Contact</a>

          <!-- Mobile Drawer Direct Actions -->
          <div class="nav-drawer-footer">
            <a href="tel:${BUSINESS_CONFIG.phone}" class="drawer-action-btn drawer-btn-call" aria-label="Direct Phone Call">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call: ${BUSINESS_CONFIG.phone}</span>
            </a>
            <a href="https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsapp.generalEnquiry)}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="drawer-action-btn drawer-btn-wa" 
               aria-label="WhatsApp Enquiry">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>WhatsApp Message</span>
            </a>
            <div class="drawer-location-tag">
              <span>📍 Peddapalli, Telangana</span>
            </div>
          </div>
        </div>

        <div class="nav-actions">
          <a href="tel:${BUSINESS_CONFIG.phone}" class="btn-nav btn-call" aria-label="Call MS TRACK TYRES">
            <svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>7569512495</span>
          </a>
          <a href="https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsapp.generalEnquiry)}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-nav btn-wa" 
             aria-label="WhatsApp Enquiry">
            <svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span class="btn-wa-label">WhatsApp</span>
          </a>
          <button class="menu-toggle" id="menu-toggle" aria-label="Toggle Navigation Menu" aria-expanded="false">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </div>
      <div class="nav-backdrop" id="nav-backdrop" aria-hidden="true"></div>
    </nav>
  `;
}

export function initNavbarInteractions() {
  const toggleBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('nav-menu');
  const backdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-action-btn');

  function openMenu() {
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.classList.add('is-active');
    menu.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-visible');
    document.body.classList.add('nav-drawer-open');
  }

  function closeMenu() {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('is-active');
    menu.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-visible');
    document.body.classList.remove('nav-drawer-open');
  }

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

    // Close menu when clicking link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }
}
