import { BUSINESS_CONFIG } from '../config.js';

export const GALLERY_ITEMS = [
  {
    id: "gallery-r15-rear",
    title: "Rear Sport Radial",
    caption: "Wide sport radial tyre on asphalt with directional road contact patch.",
    category: "Sport / Street",
    image: "/images/gallery/01-r15-rear-radial.webp",
    aspect: "tall"
  },
  {
    id: "gallery-ktm-lean",
    title: "Track Lean Contact Patch",
    caption: "KTM sports machine at extreme lean angle showcasing shoulder curvature.",
    category: "Sport / Track",
    image: "/images/gallery/02-ktm-lean-contact.webp",
    aspect: "tall"
  },
  {
    id: "gallery-shop-stacks",
    title: "Workshop Tyre Stacks",
    caption: "Fresh factory-spec motorcycle tyres arranged at Peddapally shop.",
    category: "Workshop Stock",
    image: "/images/gallery/03-shop-tyre-stacks.webp",
    aspect: "wide"
  },
  {
    id: "gallery-shop-inventory",
    title: "Shopfloor Tyre Inventory",
    caption: "Organized performance radial stock ready for immediate motorcycle fitment.",
    category: "Workshop Stock",
    image: "/images/gallery/04-shop-tyre-inventory.webp",
    aspect: "wide"
  },
  {
    id: "gallery-brand-roster",
    title: "Official Brand Roster",
    caption: "Peddapally store signage listing premier performance brands.",
    category: "Workshop Stock",
    image: "/images/gallery/05-shop-roster-poster.webp",
    aspect: "square"
  },
  {
    id: "gallery-tread-macro",
    title: "WSBK Flash Siping Detail",
    caption: "High-resolution macro of Pirelli Diablo WSBK lightning flash siping and silica tread.",
    category: "Tyre Tread",
    image: "/images/gallery/06-lean-tread-macro.webp",
    aspect: "wide"
  },
  {
    id: "gallery-traction-warmup",
    title: "Compound Traction Warmup",
    caption: "High-friction tyre compound temperature warmup demonstrating shoulder adhesion.",
    category: "Sport / Track",
    image: "/images/gallery/07-alloy-wheel-disc.webp",
    aspect: "square"
  },
  {
    id: "gallery-adventure-compass",
    title: "All-Terrain Compass Block Tread",
    caption: "Apollo Tramplr XR dual-purpose multi-surface block pattern with stone ejectors.",
    category: "Tyre Tread",
    image: "/images/gallery/08-adventure-block-tread.webp",
    aspect: "wide"
  }
];

export const GALLERY_CATEGORIES = [
  "All Photographs",
  "Sport / Track",
  "Sport / Street",
  "Tyre Tread",
  "Workshop Stock"
];

let activeFilter = "All Photographs";

export function renderGallery() {
  return `
    <section class="section gallery-section" id="gallery-section">
      <div class="section-container">
        <div class="section-header reveal-on-scroll">
          <div class="section-tag">REAL PRODUCT PHOTOGRAPHY</div>
          <h2 class="section-title">TYRE GALLERY</h2>
          <p class="section-desc">
            Authentic photographs of motorcycle tyres, contact patches, and workshop stock at MS TRACK TYRES Peddapally.
          </p>
        </div>

        <!-- Category Filters -->
        <div class="gallery-filters reveal-on-scroll" role="tablist" aria-label="Tyre Gallery Categories">
          ${GALLERY_CATEGORIES.map(cat => `
            <button 
              type="button" 
              class="gallery-filter-btn ${cat === activeFilter ? 'is-active' : ''}" 
              data-category="${cat}"
              role="tab"
              aria-selected="${cat === activeFilter ? 'true' : 'false'}">
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Gallery Grid -->
        <div class="photo-gallery-grid" id="photo-gallery-grid" role="region" aria-live="polite">
          ${renderGalleryCards(activeFilter)}
        </div>

        <!-- Lightbox Modal for High-Resolution Inspection -->
        <div class="gallery-lightbox" id="gallery-lightbox" role="dialog" aria-modal="true" aria-hidden="true" style="display: none;">
          <div class="lightbox-backdrop" id="lightbox-backdrop"></div>
          <div class="lightbox-dialog">
            <button type="button" class="lightbox-close" id="lightbox-close" aria-label="Close Lightbox">✕</button>
            <div class="lightbox-media">
              <img id="lightbox-img" src="" alt="Enlarged motorcycle tyre photo" />
            </div>
            <div class="lightbox-info">
              <div class="lightbox-meta">
                <span class="lightbox-category" id="lightbox-category"></span>
                <h3 class="lightbox-title" id="lightbox-title"></h3>
                <p class="lightbox-caption" id="lightbox-caption"></p>
              </div>
              <div class="lightbox-actions">
                <a href="#" id="lightbox-wa-btn" target="_blank" rel="noopener noreferrer" class="btn btn-wa-sm">
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderGalleryCards(filter) {
  const items = filter === "All Photographs" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return items.map(item => `
    <article class="photo-gallery-card ${item.aspect}" data-id="${item.id}" data-category="${item.category}">
      <div class="photo-card-media" tabindex="0" role="button" aria-label="Enlarge ${item.title}">
        <img 
          src="${item.image}" 
          alt="${item.title} - ${item.caption}" 
          class="gallery-img" 
          loading="lazy" 
        />
        <div class="photo-hover-overlay">
          <div class="photo-hover-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            <span>Inspect Detail</span>
          </div>
        </div>
        <span class="photo-category-badge">${item.category}</span>
      </div>
      <div class="photo-card-info">
        <h3 class="photo-title">${item.title}</h3>
        <p class="photo-caption">${item.caption}</p>
        <div class="photo-card-action">
          <a href="https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent(`Hello MS TRACK TYRES, I saw this tyre photograph on your website: "${item.title}". Please share available sizes and pricing.`)}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-photo-wa"
             aria-label="Enquire about ${item.title} on WhatsApp">
            <span>Enquire Size</span>
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

export function initGalleryInteractions() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const grid = document.getElementById('photo-gallery-grid');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCat = document.getElementById('lightbox-category');
  const lightboxWaBtn = document.getElementById('lightbox-wa-btn');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  if (!grid) return;

  // Category filter click
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      activeFilter = btn.dataset.category;
      grid.innerHTML = renderGalleryCards(activeFilter);
      bindCardClicks();
    });
  });

  function bindCardClicks() {
    const cardMediaList = grid.querySelectorAll('.photo-card-media');
    cardMediaList.forEach(media => {
      const card = media.closest('.photo-gallery-card');
      const id = card.dataset.id;
      const item = GALLERY_ITEMS.find(i => i.id === id);
      if (!item) return;

      const openLightbox = () => {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = item.image;
        lightboxImg.alt = item.title;
        if (lightboxTitle) lightboxTitle.textContent = item.title;
        if (lightboxCaption) lightboxCaption.textContent = item.caption;
        if (lightboxCat) lightboxCat.textContent = item.category;
        if (lightboxWaBtn) {
          lightboxWaBtn.href = `https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent(`Hello MS TRACK TYRES, I am inspecting "${item.title}" from your gallery. Please let me know available stock and fitment for my motorcycle.`)}`;
        }
        lightbox.style.display = 'flex';
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };

      media.addEventListener('click', openLightbox);
      media.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox();
        }
      });
    });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });

  bindCardClicks();
}
