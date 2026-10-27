import { POPULAR_SIZES } from '../data/products.js';

export function renderSearch() {
  return `
    <section class="section search-section" id="search-section">
      <div class="section-container">
        <div class="section-header reveal-on-scroll">
          <div class="section-tag">SIZE FINDER</div>
          <h2 class="section-title">FIND YOUR TYRE<span class="accent-period">.</span></h2>
          <p class="section-desc">
            Search by motorcycle tyre size or choose a popular dimension below.
          </p>
        </div>

        <div class="search-card reveal-on-scroll">
          <form class="search-form" id="tyre-search-form" onsubmit="return false;">
            <div class="search-input-wrapper">
              <div class="search-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <input 
                type="text" 
                id="tyre-size-input" 
                class="search-input" 
                placeholder="e.g. 110/70-17, 140/70-17, 150/60-17..." 
                autocomplete="off"
                aria-label="Search tyre by size"
              />
              <button type="button" class="btn-clear-search" id="btn-clear-search" title="Clear input" aria-label="Clear Search Input" style="display: none;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <!-- Validation Feedback Indicator -->
            <div class="search-validation" id="search-validation-msg" role="status" aria-live="polite">
              <span class="status-indicator neutral"></span>
              <span class="validation-text">Format: [Width]/[Aspect Ratio]-[Rim]</span>
            </div>

            <!-- Quick Size Suggestion Chips -->
            <div class="quick-sizes">
              <span class="quick-sizes-label">POPULAR SIZES:</span>
              <div class="chip-container">
                ${POPULAR_SIZES.map(size => `
                  <button type="button" class="size-chip" data-size="${size}">${size}</button>
                `).join('')}
              </div>
            </div>
          </form>

          <!-- Verified Notice -->
          <div class="search-disclaimer">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>Notice: Confirm rim clearance and speed rating with our technicians before fitment.</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initSearchInteractions(onSearchChange) {
  const input = document.getElementById('tyre-size-input');
  const clearBtn = document.getElementById('btn-clear-search');
  const valMsg = document.getElementById('search-validation-msg');
  const sizeChips = document.querySelectorAll('.size-chip');

  if (!input) return;

  // Regex parser for standard motorcycle tyre sizes:
  // e.g. 110/70-17, 110/70R17, 110/70 ZR17, 90/90-19
  const tyreSizeRegex = /^(\d{2,3})\s*[\/xX-]\s*(\d{2,3})\s*[-–—\s]?(?:[A-Za-z]+)?\s*[-–—\s]?(\d{2})$/;

  function validateAndSearch(rawQuery) {
    const trimmed = rawQuery.trim();
    if (!trimmed) {
      clearBtn.style.display = 'none';
      valMsg.innerHTML = `
        <span class="status-indicator neutral"></span>
        <span class="validation-text">Type standard tyre format: [Width]/[Aspect Ratio]-[Rim]</span>
      `;
      if (onSearchChange) onSearchChange('');
      return;
    }

    clearBtn.style.display = 'flex';
    const match = trimmed.match(tyreSizeRegex);

    if (match) {
      const width = match[1];
      const aspect = match[2];
      const rim = match[3];
      valMsg.innerHTML = `
        <span class="status-indicator valid"></span>
        <span class="validation-text">Valid Size Format: <strong>${width}mm</strong> width • <strong>${aspect}%</strong> profile • <strong>${rim}"</strong> rim</span>
      `;
    } else {
      valMsg.innerHTML = `
        <span class="status-indicator typing"></span>
        <span class="validation-text">Searching records matching "<strong>${trimmed}</strong>"...</span>
      `;
    }

    if (onSearchChange) onSearchChange(trimmed);
  }

  input.addEventListener('input', (e) => {
    validateAndSearch(e.target.value);
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    validateAndSearch('');
    input.focus();
  });

  sizeChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const size = chip.getAttribute('data-size');
      input.value = size;
      validateAndSearch(size);
      // Smoothly scroll down to catalogue so the customer sees the results
      const catalogueEl = document.getElementById('catalogue-section');
      if (catalogueEl) {
        catalogueEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
