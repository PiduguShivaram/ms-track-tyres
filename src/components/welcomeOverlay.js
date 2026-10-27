import gsap from 'gsap';
import { BUSINESS_CONFIG } from '../config.js';

const SESSION_STORAGE_KEY = 'ms_track_tyres_welcome_seen';

/**
 * Checks whether the visitor has already seen the welcome overlay in the current tab session.
 */
export function hasSeenWelcomeIntro() {
  try {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
  } catch (e) {
    // If storage is blocked/restricted, fallback gracefully
    return false;
  }
}

/**
 * Marks the welcome intro as dismissed in the session storage.
 */
export function markWelcomeIntroSeen() {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
  } catch (e) {
    // Fallback gracefully
  }
}

/**
 * Renders the HTML template for the Welcome Intro Overlay.
 */
export function renderWelcomeOverlay() {
  // If already seen in this session, return empty string so no DOM node is injected
  if (hasSeenWelcomeIntro()) {
    return '';
  }

  const cfg = BUSINESS_CONFIG.welcomeOverlay || {
    enabled: true,
    durationMs: 4000,
    businessName: BUSINESS_CONFIG.name,
    tagline: BUSINESS_CONFIG.tagline,
    location: BUSINESS_CONFIG.location,
    phone: BUSINESS_CONFIG.phone,
    whatsappPhone: BUSINESS_CONFIG.whatsappPhone,
    logoSrc: BUSINESS_CONFIG.logo.src,
    logoFallback: "/images/branding/ms-track-tyres-logo.png",
    offer: {
      badge: "VERIFIED PEDDAPALLI STORE",
      title: "Explore Our Latest Tyre Collections",
      description: "Direct manufacturer sourcing, genuine fitment & specialized compound consultation.",
      ctaText: "Connect on WhatsApp"
    },
    skipText: "Skip Intro"
  };

  const whatsappUrl = `https://wa.me/${cfg.whatsappPhone}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsapp.generalEnquiry)}`;

  return `
    <aside 
      id="ms-welcome-overlay" 
      class="ms-welcome-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-label="Welcome to ${cfg.businessName}"
    >
      <!-- Automotive Lighting & Carbon Texture FX -->
      <div class="welcome-bg-fx" aria-hidden="true">
        <div class="welcome-radial-glow"></div>
        <div class="welcome-carbon-grid"></div>
        <div class="welcome-speed-streaks"></div>
      </div>

      <!-- Top Progress Timer & Accessible Skip Button -->
      <div class="welcome-topbar">
        <div class="welcome-timer-bar-wrap" aria-hidden="true">
          <div class="welcome-timer-bar" id="welcome-timer-bar"></div>
        </div>
        <button 
          type="button" 
          class="welcome-skip-btn" 
          id="welcome-skip-btn" 
          aria-label="Skip welcome introduction"
          tabindex="0"
        >
          <span>${cfg.skipText || 'Skip Intro'}</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polygon points="5 4 15 12 5 20 5 4"></polygon>
            <line x1="19" y1="5" x2="19" y2="19"></line>
          </svg>
        </button>
      </div>

      <!-- Center Brand Presentation Shell -->
      <div class="welcome-card-shell">
        <div class="welcome-card">
          <div class="welcome-card-border-glow" aria-hidden="true"></div>

          <!-- Phase 2: Official Business Logo -->
          <div class="welcome-logo-wrap" id="welcome-anim-logo">
            <div class="welcome-logo-halo" aria-hidden="true"></div>
            <picture>
              <source srcset="${cfg.logoSrc}" type="image/webp" />
              <img 
                src="${cfg.logoFallback || cfg.logoSrc}" 
                alt="${cfg.businessName} Official Store Logo" 
                class="welcome-logo-img" 
                width="240" 
                height="80" 
              />
            </picture>
          </div>

          <!-- Phase 3A: Business Name & Identity -->
          <div class="welcome-identity" id="welcome-anim-identity">
            <span class="welcome-kicker">AUTHENTIC MOTORCYCLE TYRE SPECIALISTS</span>
            <h1 class="welcome-title">${cfg.businessName}</h1>
            <p class="welcome-tagline">${cfg.tagline}</p>
          </div>

          <!-- Phase 3B: Verified Location & Direct Phone -->
          <div class="welcome-quick-meta" id="welcome-anim-meta">
            <!-- Verified Location with Pin Icon -->
            <div class="welcome-meta-item">
              <div class="welcome-icon-box location-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div class="welcome-meta-text">
                <span class="welcome-meta-label">PEDDAPALLI WORKSHOP</span>
                <span class="welcome-meta-val" title="${cfg.location}">${cfg.location}</span>
              </div>
            </div>

            <!-- Clickable Phone with Phone Icon -->
            <a 
              href="tel:${cfg.phone}" 
              class="welcome-meta-item phone-link" 
              id="welcome-phone-link"
              aria-label="Call MS Track Tyres directly at ${cfg.phone}"
            >
              <div class="welcome-icon-box phone-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div class="welcome-meta-text">
                <span class="welcome-meta-label">DIRECT CALL</span>
                <span class="welcome-meta-val phone-val">${cfg.phone}</span>
              </div>
            </a>
          </div>

          <!-- Phase 3C: Verified Special Offer / Spotlight Card -->
          <div class="welcome-offer-card" id="welcome-anim-offer">
            <div class="welcome-offer-badge">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>${cfg.offer.badge}</span>
            </div>
            <h2 class="welcome-offer-title">${cfg.offer.title}</h2>
            <p class="welcome-offer-desc">${cfg.offer.description}</p>
          </div>

          <!-- Phase 3D: Verified WhatsApp Direct Enquiry Button -->
          <div class="welcome-actions" id="welcome-anim-actions">
            <a 
              href="${whatsappUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="welcome-btn-whatsapp" 
              id="welcome-wa-btn"
              aria-label="Enquire with MS Track Tyres on WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>${cfg.offer.ctaText || "Connect on WhatsApp"}</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  `;
}

/**
 * Initializes and orchestrates the welcome overlay animation sequence.
 * Handles auto-dismiss after ~4s, skip button click, keyboard Esc, and safety fallbacks.
 */
export function initWelcomeOverlay(onComplete) {
  const overlay = document.getElementById('ms-welcome-overlay');

  // If overlay is not present (e.g. already seen in session), execute callback & return
  if (!overlay) {
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  // Lock background body scroll while overlay is showing
  document.body.classList.add('ms-welcome-active');

  const skipBtn = document.getElementById('welcome-skip-btn');
  const timerBar = document.getElementById('welcome-timer-bar');
  const animLogo = document.getElementById('welcome-anim-logo');
  const animIdentity = document.getElementById('welcome-anim-identity');
  const animMeta = document.getElementById('welcome-anim-meta');
  const animOffer = document.getElementById('welcome-anim-offer');
  const animActions = document.getElementById('welcome-anim-actions');
  const waBtn = document.getElementById('welcome-wa-btn');
  const phoneLink = document.getElementById('welcome-phone-link');

  let isDismissed = false;
  let masterTimeline = null;
  let timerTween = null;
  let safetyTimeout = null;

  function dismissOverlay() {
    if (isDismissed) return;
    isDismissed = true;

    // Clear safety fallback timer
    if (safetyTimeout) {
      clearTimeout(safetyTimeout);
      safetyTimeout = null;
    }

    // Stop active tweens
    if (masterTimeline) masterTimeline.kill();
    if (timerTween) timerTween.kill();

    // Mark as seen in session storage
    markWelcomeIntroSeen();

    // Unlock body scroll immediately so user can interact
    document.body.classList.remove('ms-welcome-active');

    // Smooth exit transition
    overlay.classList.add('ms-welcome-exiting');

    // Smooth fade out using GSAP
    gsap.to(overlay, {
      opacity: 0,
      scale: 1.02,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
        if (typeof onComplete === 'function') {
          onComplete();
        }
      }
    });
  }

  // Safety fallback timeout: guaranteed removal after 5.5s so overlay never stays stuck
  safetyTimeout = setTimeout(() => {
    dismissOverlay();
  }, 5500);

  // User interactions: Skip button, clicking WhatsApp or Phone, or pressing Esc
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dismissOverlay();
    });
  }

  if (waBtn) {
    waBtn.addEventListener('click', () => {
      // Allow link navigation to happen, but dismiss overlay for when user returns
      markWelcomeIntroSeen();
      setTimeout(dismissOverlay, 300);
    });
  }

  if (phoneLink) {
    phoneLink.addEventListener('click', () => {
      markWelcomeIntroSeen();
      setTimeout(dismissOverlay, 300);
    });
  }

  // Keyboard accessibility: Escape key dismisses
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      window.removeEventListener('keydown', handleKeydown);
      dismissOverlay();
    }
  };
  window.addEventListener('keydown', handleKeydown);

  // Check if reduced motion is requested by user
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // If reduced motion is requested, show static content and dismiss cleanly after 3.5s
    setTimeout(dismissOverlay, 3500);
    return;
  }

  // GSAP 4-Phase Cinematic Sequence
  // Total intro visible duration is ~4.0 seconds
  masterTimeline = gsap.timeline();

  // Phase 1: Background & Overlay Entrance
  masterTimeline.fromTo(
    overlay,
    { opacity: 0 },
    { opacity: 1, duration: 0.35, ease: 'power2.out' }
  );

  // Phase 2: Logo scale-up and fade-in with glow
  if (animLogo) {
    masterTimeline.fromTo(
      animLogo,
      { scale: 0.84, opacity: 0, y: -6 },
      { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.5)' },
      '-=0.15'
    );
  }

  // Phase 3: Business Identity, Location & Phone, Special Offer, and WhatsApp CTA
  const infoElements = [animIdentity, animMeta, animOffer, animActions].filter(Boolean);
  if (infoElements.length > 0) {
    masterTimeline.fromTo(
      infoElements,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
      },
      '-=0.3'
    );
  }

  // Concurrent Timer Bar Progress (Runs across ~3.8 seconds)
  if (timerBar) {
    timerTween = gsap.to(timerBar, {
      width: '100%',
      duration: 3.8,
      ease: 'linear'
    });
  }

  // Phase 4: Hold for 2.2 seconds (reaching ~4 seconds total active experience), then auto-exit
  masterTimeline.to({}, { duration: 2.2 });
  masterTimeline.add(() => {
    dismissOverlay();
  });
}
