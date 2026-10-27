import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initScrollAnimations } from './utils/animations.js';
import { renderNavbar, initNavbarInteractions } from './components/navbar.js';
import { renderHero } from './components/hero.js';
import { renderGallery, initGalleryInteractions } from './components/gallery.js';
import { renderSearch, initSearchInteractions } from './components/search.js';
import { renderCatalogue, initCatalogueInteractions, setSearchQuery } from './components/catalogue.js';
import { renderBrands } from './components/brands.js';
import { renderServices } from './components/services.js';
import { renderContact, initContactInteractions } from './components/contact.js';
import { renderMobileBar } from './components/mobileBar.js';

gsap.registerPlugin(ScrollTrigger);

class MSApp {
  constructor() {
    this.appElement = document.getElementById('app');
    this.lenis = null;
  }

  init() {
    // 1. Render image-first UI components
    this.renderLayout();

    // 2. Setup Lenis Smooth Scroll
    this.setupSmoothScroll();

    // 3. Initialize Interactive Component Logic
    this.setupComponentInteractions();

    // 4. Initialize Scroll Reveals
    initScrollAnimations();

    console.log('%c MS TRACK TYRES %c Image-First Website Active • Peddapalli, Telangana ', 
      'background: #ff283b; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;', 
      'background: #12151b; color: #10b981; font-weight: bold; padding: 4px 8px; border-radius: 0 4px 4px 0;'
    );
  }

  renderLayout() {
    this.appElement.innerHTML = `
      ${renderNavbar()}
      <main>
        ${renderHero()}
        ${renderGallery()}
        ${renderSearch()}
        ${renderCatalogue()}
        ${renderBrands()}
        ${renderServices()}
      </main>
      ${renderContact()}
      ${renderMobileBar()}
    `;
  }

  setupSmoothScroll() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    try {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false
      });

      this.lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      console.warn('Lenis smooth scrolling disabled, using standard scrolling:', e);
    }
  }

  setupComponentInteractions() {
    // Navbar mobile toggle & link behavior
    initNavbarInteractions();

    // Tyre Gallery filter tabs & detail lightbox
    initGalleryInteractions();

    // Find Your Tyre Search input validation & quick size chips
    initSearchInteractions((query) => {
      setSearchQuery(query);
    });

    // Catalogue filters, WhatsApp CTA generators, and comparison drawer
    initCatalogueInteractions();

    // Contact WhatsApp composer
    initContactInteractions();
  }
}

// Boot application when DOM is ready
function bootApp() {
  const app = new MSApp();
  app.init();
  window.__msApp = app;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
