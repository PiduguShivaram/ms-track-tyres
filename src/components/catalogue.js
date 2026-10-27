import { PRODUCTS, CATEGORIES, POSITIONS } from '../data/products.js';
import { BUSINESS_CONFIG } from '../config.js';

let state = {
  activeSearch: '',
  activeBrand: 'All Brands',
  activeCategory: 'All Categories',
  activePosition: 'All Positions',
  compareList: [] // Array of product ids (max 2)
};

export function renderCatalogue() {
  const brands = ['All Brands', ...new Set(PRODUCTS.map(p => p.brand))];

  return `
    <section class="section catalogue-section" id="catalogue-section">
      <div class="section-container">
        <div class="section-header reveal-on-scroll">
          <div class="section-tag">MOTORCYCLE TYRE CATALOGUE</div>
          <h2 class="section-title">TYRE LINEUP<span class="accent-period">.</span></h2>
          <p class="section-desc">
            Genuine motorcycle tyres in stock. Tap WhatsApp on any model to confirm today's price and fitment.
          </p>
        </div>

        <!-- Filter Controls Bar -->
        <div class="catalogue-filters-bar reveal-on-scroll">
          <div class="filter-group">
            <label for="filter-brand" class="filter-label">BRAND</label>
            <select id="filter-brand" class="filter-select" aria-label="Filter by brand">
              ${brands.map(b => `<option value="${b}">${b}</option>`).join('')}
            </select>
          </div>

          <div class="filter-group">
            <label for="filter-category" class="filter-label">CATEGORY</label>
            <select id="filter-category" class="filter-select" aria-label="Filter by category">
              ${CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>

          <div class="filter-group">
            <label for="filter-position" class="filter-label">POSITION</label>
            <select id="filter-position" class="filter-select" aria-label="Filter by wheel position">
              ${POSITIONS.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
          </div>

          <div class="filter-group filter-actions">
            <button type="button" class="btn-reset-filters" id="btn-reset-filters" title="Reset All Filters">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
              <span>Reset</span>
            </button>
          </div>
        </div>

        <!-- Active Filter Status & Match Counter -->
        <div class="catalogue-meta-bar">
          <div class="meta-counter" id="catalogue-match-counter">Showing ${PRODUCTS.length} tyres</div>
          <div class="meta-disclaimer">
            <span class="dot-green"></span>
            <span>All dimensional data sourced from verified tyre specifications</span>
          </div>
        </div>

        <!-- Products Grid Container -->
        <div class="products-grid" id="products-grid" role="list">
          <!-- Rendered dynamically -->
        </div>

        <!-- Comparison Bar Drawer -->
        <div class="compare-drawer" id="compare-drawer" aria-live="polite">
          <div class="compare-drawer-inner">
            <div class="compare-drawer-header">
              <div class="compare-counter">
                <span id="compare-count-text">0/2 Selected for Comparison</span>
              </div>
              <div class="compare-actions">
                <button type="button" class="btn-view-compare" id="btn-view-compare" disabled>
                  <span>Compare Specifications</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
                </button>
                <button type="button" class="btn-clear-compare" id="btn-clear-compare" title="Clear comparison">Clear</button>
              </div>
            </div>
            <div class="compare-chips" id="compare-chips">
              <!-- Selected tyre chips -->
            </div>
          </div>
        </div>

        <!-- Comparison Modal Dialog -->
        <div class="compare-modal" id="compare-modal" role="dialog" aria-modal="true" aria-labelledby="compare-modal-title" style="display: none;">
          <div class="modal-backdrop" id="compare-modal-backdrop"></div>
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="compare-modal-title">SPECIFICATION COMPARISON</h3>
              <button type="button" class="btn-close-modal" id="btn-close-modal" aria-label="Close comparison">✕</button>
            </div>
            <div class="modal-body" id="compare-modal-body">
              <!-- Table injected dynamically -->
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function getFilteredProducts() {
  return PRODUCTS.filter(product => {
    // Search query match (on size, brand, name)
    if (state.activeSearch) {
      const q = state.activeSearch.toLowerCase().replace(/[\s\-\/]/g, '');
      const s = product.size.toLowerCase().replace(/[\s\-\/]/g, '');
      const b = product.brand.toLowerCase();
      const n = product.name.toLowerCase();
      const full = `${b} ${n} ${s}`.toLowerCase();
      if (!s.includes(q) && !full.includes(q)) return false;
    }

    // Brand filter
    if (state.activeBrand !== 'All Brands' && product.brand !== state.activeBrand) {
      return false;
    }

    // Category filter
    if (state.activeCategory !== 'All Categories' && product.category !== state.activeCategory) {
      return false;
    }

    // Position filter
    if (state.activePosition !== 'All Positions' && product.position !== state.activePosition) {
      return false;
    }

    return true;
  });
}

export function updateCatalogueGrid() {
  const container = document.getElementById('products-grid');
  const counter = document.getElementById('catalogue-match-counter');
  if (!container) return;

  const filtered = getFilteredProducts();

  if (counter) {
    counter.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} tyres`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="catalogue-empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6M9 9l6 6"/></svg>
        </div>
        <h3 class="empty-title">NO MATCHING TYRES FOUND</h3>
        <p class="empty-desc">
          We couldn't find a configured tyre matching your current filter criteria (${state.activeSearch || state.activeBrand || state.activeCategory}).
        </p>
        <div class="empty-actions">
          <button type="button" class="btn btn-secondary" id="btn-empty-reset">Reset Filters</button>
          <a href="https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent('Hello MS TRACK TYRES, I am looking for a motorcycle tyre size that is not listed in the catalogue: ' + (state.activeSearch || 'Custom size') + '. Please confirm availability.')}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn btn-primary">
            <span>Enquire Custom Size on WhatsApp</span>
          </a>
        </div>
      </div>
    `;

    const emptyReset = document.getElementById('btn-empty-reset');
    if (emptyReset) {
      emptyReset.addEventListener('click', resetAllFilters);
    }
    return;
  }

  container.innerHTML = filtered.map(product => {
    const isCompared = state.compareList.includes(product.id);
    const waMessage = BUSINESS_CONFIG.whatsapp.productEnquiry(product.name, product.size);
    const waUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent(waMessage)}`;

    return `
      <article class="product-card ${isCompared ? 'is-comparing' : ''}" data-id="${product.id}" role="listitem">
        <!-- 1. Real Product Photograph Stage -->
        <div class="product-card-photo-stage">
          <img 
            src="${product.image || '/images/products/mrf-masseter-fx.webp'}" 
            alt="${product.brand} ${product.name} ${product.size} Motorcycle Tyre" 
            class="product-card-img" 
            loading="lazy" 
          />
          <div class="product-photo-tags">
            <span class="product-category-pill">${product.category}</span>
            <span class="product-position-badge ${product.position.toLowerCase()}">${product.position}</span>
          </div>
          ${product.photoBadge ? `<span class="product-photo-badge">${product.photoBadge}</span>` : ''}
        </div>

        <div class="product-card-body">
          <div class="card-brand-row">
            <span class="product-brand">${product.brand}</span>
            <span class="product-status-tag ${product.stockStatus.includes('Verified') ? 'verified' : 'enquire'}">
              <span class="status-indicator-dot"></span>${product.stockStatus}
            </span>
          </div>

          <h3 class="product-name">${product.name}</h3>

          <div class="product-size-callout">
            <span class="size-label">SIZE</span>
            <span class="size-value">${product.size}</span>
          </div>

          <!-- Price & Construction -->
          <div class="product-price-row">
            <span class="price-val">${product.verifiedPrice ? `₹${product.verifiedPrice}` : 'Enquire for Daily Best Price'}</span>
            <span class="meta-type">${product.construction.split(' ')[0]} • ${product.speedRating.split(' ')[0]}</span>
          </div>
        </div>

        <div class="product-card-actions">
          <a href="${waUrl}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-product-wa" 
             aria-label="Enquire about ${product.name} ${product.size} on WhatsApp">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span>WhatsApp</span>
          </a>

          <button type="button" 
                  class="btn-toggle-compare ${isCompared ? 'active' : ''}" 
                  data-compare-id="${product.id}"
                  aria-pressed="${isCompared}"
                  title="Compare with another tyre">
            <span>${isCompared ? 'Compared' : 'Compare'}</span>
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Re-attach compare button events
  const compareBtns = container.querySelectorAll('.btn-toggle-compare');
  compareBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-compare-id');
      toggleCompare(id);
    });
  });
}

function toggleCompare(id) {
  const index = state.compareList.indexOf(id);
  if (index > -1) {
    state.compareList.splice(index, 1);
  } else {
    if (state.compareList.length >= 2) {
      // Shift out oldest
      state.compareList.shift();
    }
    state.compareList.push(id);
  }
  updateCatalogueGrid();
  updateCompareDrawer();
}

function updateCompareDrawer() {
  const drawer = document.getElementById('compare-drawer');
  const countText = document.getElementById('compare-count-text');
  const compareBtn = document.getElementById('btn-view-compare');
  const chipsContainer = document.getElementById('compare-chips');

  if (!drawer) return;

  if (state.compareList.length > 0) {
    drawer.classList.add('is-visible');
    countText.textContent = `${state.compareList.length}/2 Selected for Comparison`;
    compareBtn.disabled = state.compareList.length < 2;

    const comparedProducts = state.compareList.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    chipsContainer.innerHTML = comparedProducts.map(p => `
      <div class="compare-chip">
        <span class="chip-name">${p.brand} ${p.name} (${p.size})</span>
        <button type="button" class="btn-remove-chip" data-remove-id="${p.id}" aria-label="Remove ${p.name}">✕</button>
      </div>
    `).join('');

    chipsContainer.querySelectorAll('.btn-remove-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const removeId = btn.getAttribute('data-remove-id');
        toggleCompare(removeId);
      });
    });
  } else {
    drawer.classList.remove('is-visible');
  }
}

function renderCompareModal() {
  const modal = document.getElementById('compare-modal');
  const body = document.getElementById('compare-modal-body');
  if (!modal || !body) return;

  const [p1, p2] = state.compareList.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  if (!p1 || !p2) return;

  body.innerHTML = `
    <div class="compare-table-wrapper">
      <table class="compare-table">
        <thead>
          <tr>
            <th class="col-feature">SPECIFICATION</th>
            <th class="col-item">${p1.brand} ${p1.name}</th>
            <th class="col-item">${p2.brand} ${p2.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="feat-label">Tyre Size</td>
            <td class="feat-val highlight-val">${p1.size}</td>
            <td class="feat-val highlight-val">${p2.size}</td>
          </tr>
          <tr>
            <td class="feat-label">Wheel Position</td>
            <td class="feat-val">${p1.position}</td>
            <td class="feat-val">${p2.position}</td>
          </tr>
          <tr>
            <td class="feat-label">Category</td>
            <td class="feat-val">${p1.category}</td>
            <td class="feat-val">${p2.category}</td>
          </tr>
          <tr>
            <td class="feat-label">Construction</td>
            <td class="feat-val">${p1.construction}</td>
            <td class="feat-val">${p2.construction}</td>
          </tr>
          <tr>
            <td class="feat-label">Speed Rating</td>
            <td class="feat-val">${p1.speedRating}</td>
            <td class="feat-val">${p2.speedRating}</td>
          </tr>
          <tr>
            <td class="feat-label">Load Index</td>
            <td class="feat-val">${p1.loadIndex}</td>
            <td class="feat-val">${p2.loadIndex}</td>
          </tr>
          <tr>
            <td class="feat-label">Pricing Note</td>
            <td class="feat-val">${p1.verifiedPrice ? `₹${p1.verifiedPrice}` : 'Enquire for Daily Best Price'}</td>
            <td class="feat-val">${p2.verifiedPrice ? `₹${p2.verifiedPrice}` : 'Enquire for Daily Best Price'}</td>
          </tr>
          <tr>
            <td class="feat-label">Direct Enquiry</td>
            <td>
              <a href="https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsapp.productEnquiry(p1.name, p1.size))}" 
                 target="_blank" 
                 class="btn-wa-compact">Enquire ${p1.name}</a>
            </td>
            <td>
              <a href="https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsapp.productEnquiry(p2.name, p2.size))}" 
                 target="_blank" 
                 class="btn-wa-compact">Enquire ${p2.name}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  modal.style.display = 'flex';
}

function resetAllFilters() {
  state.activeSearch = '';
  state.activeBrand = 'All Brands';
  state.activeCategory = 'All Categories';
  state.activePosition = 'All Positions';

  const brandSel = document.getElementById('filter-brand');
  const catSel = document.getElementById('filter-category');
  const posSel = document.getElementById('filter-position');
  const searchInput = document.getElementById('tyre-size-input');

  if (brandSel) brandSel.value = 'All Brands';
  if (catSel) catSel.value = 'All Categories';
  if (posSel) posSel.value = 'All Positions';
  if (searchInput) searchInput.value = '';

  updateCatalogueGrid();
}

export function initCatalogueInteractions() {
  updateCatalogueGrid();

  const brandSel = document.getElementById('filter-brand');
  if (brandSel) {
    brandSel.addEventListener('change', (e) => {
      state.activeBrand = e.target.value;
      updateCatalogueGrid();
    });
  }

  const catSel = document.getElementById('filter-category');
  if (catSel) {
    catSel.addEventListener('change', (e) => {
      state.activeCategory = e.target.value;
      updateCatalogueGrid();
    });
  }

  const posSel = document.getElementById('filter-position');
  if (posSel) {
    posSel.addEventListener('change', (e) => {
      state.activePosition = e.target.value;
      updateCatalogueGrid();
    });
  }

  const resetBtn = document.getElementById('btn-reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllFilters);
  }

  const compareBtn = document.getElementById('btn-view-compare');
  if (compareBtn) {
    compareBtn.addEventListener('click', renderCompareModal);
  }

  const clearCompareBtn = document.getElementById('btn-clear-compare');
  if (clearCompareBtn) {
    clearCompareBtn.addEventListener('click', () => {
      state.compareList = [];
      updateCatalogueGrid();
      updateCompareDrawer();
    });
  }

  const closeModal = document.getElementById('btn-close-modal');
  const backdrop = document.getElementById('compare-modal-backdrop');
  const modal = document.getElementById('compare-modal');

  const closeDialog = () => {
    if (modal) modal.style.display = 'none';
  };

  if (closeModal) closeModal.addEventListener('click', closeDialog);
  if (backdrop) backdrop.addEventListener('click', closeDialog);
}

export function setSearchQuery(query) {
  state.activeSearch = query;
  updateCatalogueGrid();
}
