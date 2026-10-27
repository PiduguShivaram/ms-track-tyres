import { BUSINESS_CONFIG } from '../config.js';

export function renderContact() {
  return `
    <footer class="section contact-section" id="contact-section">
      <div class="section-container">
        <div class="section-header reveal-on-scroll">
          <div class="section-tag">CONTACT & ENQUIRY</div>
          <h2 class="section-title">CONNECT WITH US<span class="accent-period">.</span></h2>
          <p class="section-desc">
            Speak directly with our tyre specialists in Peddapalli for live stock checks, price quotes, and fitment.
          </p>
        </div>

        <div class="contact-grid reveal-on-scroll">
          <!-- Left Column: Quick Contact Cards & Genuine Shop Photo -->
          <div class="contact-info-col">
            <!-- Brand & Verified Location Card -->
            <div class="contact-card shop-location-card">
              <div class="shop-showcase-photo">
                <img 
                  src="/images/contact/shop-peddapalli-location.webp" 
                  alt="MS TRACK TYRES Peddapalli Workshop and Showroom" 
                  class="shop-thumb-img" 
                  loading="lazy"
                />
                <div class="shop-photo-overlay">
                  <span class="shop-badge">PEDDAPALLI SHOPFLOOR</span>
                </div>
              </div>

              <div class="contact-card-content">
                <div class="contact-brand-row">
                  <img src="${BUSINESS_CONFIG.logo.src}" alt="${BUSINESS_CONFIG.logo.alt}" class="contact-logo-img" width="140" height="45" />
                </div>
                <h3 class="card-location-city">${BUSINESS_CONFIG.location}</h3>
                <p class="card-address-text"><strong>Landmark:</strong> ${BUSINESS_CONFIG.address.landmark}</p>
                <p class="card-shipping-text">🚚 ${BUSINESS_CONFIG.address.shipping}</p>
              </div>
            </div>

            <!-- Click to Call Card -->
            <div class="contact-card highlight-call">
              <div class="contact-icon-box">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div class="contact-card-content">
                <span class="card-eyebrow">DIRECT TELEPHONE</span>
                <h3 class="card-phone-number">${BUSINESS_CONFIG.phone}</h3>
                <p class="card-hint">Tap to call our Peddapalli workshop directly.</p>
                <a href="tel:${BUSINESS_CONFIG.phone}" class="btn btn-call-large" id="btn-click-to-call" aria-label="Call MS TRACK TYRES at 7569512495">
                  <span>Call 7569512495</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive WhatsApp Generator -->
          <div class="contact-wa-col">
            <div class="wa-composer-card">
              <div class="wa-composer-header">
                <div class="wa-badge">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  <span>OFFICIAL WHATSAPP ENQUIRY</span>
                </div>
                <span class="wa-status">Online • 7569512495</span>
              </div>

              <div class="wa-composer-body">
                <label for="wa-custom-size" class="wa-label">Your Tyre Size or Bike Model</label>
                <input 
                  type="text" 
                  id="wa-custom-size" 
                  class="wa-input" 
                  placeholder="e.g. 140/70-17 or Yamaha R15" 
                  value=""
                />

                <label for="wa-custom-product" class="wa-label">Preferred Tyre Brand (Optional)</label>
                <input 
                  type="text" 
                  id="wa-custom-product" 
                  class="wa-input" 
                  placeholder="e.g. Apollo, MRF, Pirelli, TVS" 
                  value=""
                />

                <div class="wa-preview-box">
                  <span class="preview-tag">MESSAGE PREVIEW:</span>
                  <p class="preview-text" id="wa-preview-text">
                    Hello MS TRACK TYRES, I would like to enquire about a motorcycle tyre. Please confirm availability and price.
                  </p>
                </div>

                <a href="#" 
                   id="btn-send-whatsapp" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="btn btn-whatsapp-submit"
                   aria-label="Send WhatsApp message to MS TRACK TYRES">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  <span>Launch WhatsApp Message</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom Branding -->
        <div class="footer-bottom reveal-on-scroll">
          <div class="footer-bottom-brand">
            <img src="${BUSINESS_CONFIG.logo.src}" alt="${BUSINESS_CONFIG.logo.alt}" class="footer-logo-img" width="130" height="42" />
            <span class="footer-sub">PEDDAPALLI • TELANGANA</span>
          </div>
          <p class="footer-legal">
            © ${new Date().getFullYear()} MS TRACK TYRES. All tyre brands, logos and trademarks are property of their respective manufacturers.
          </p>
        </div>
      </div>
    </footer>
  `;
}

export function initContactInteractions() {
  const sizeInput = document.getElementById('wa-custom-size');
  const prodInput = document.getElementById('wa-custom-product');
  const preview = document.getElementById('wa-preview-text');
  const sendBtn = document.getElementById('btn-send-whatsapp');

  function updateWaLink() {
    const size = sizeInput?.value.trim() || '';
    const prod = prodInput?.value.trim() || '';
    const message = BUSINESS_CONFIG.whatsapp.productEnquiry(prod, size);
    
    if (preview) {
      preview.textContent = message;
    }

    if (sendBtn) {
      sendBtn.href = `https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent(message)}`;
    }
  }

  if (sizeInput) sizeInput.addEventListener('input', updateWaLink);
  if (prodInput) prodInput.addEventListener('input', updateWaLink);

  updateWaLink();
}
