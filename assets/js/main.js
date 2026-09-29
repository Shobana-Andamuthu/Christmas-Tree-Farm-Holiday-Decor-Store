/**
 * Pinecrest Meadows — Christmas Tree Farm & Holiday Market
 * Main Interactive JavaScript (Theme, RTL, Mobile Menu, Tree Selector, Cart Toast, Scroll, Preloader)
 */

// --------------------------------------------------------------------------
// ATTRACTIVE HOLIDAY PAGE PRELOADER (Ultra-Smooth, Responsive)
// --------------------------------------------------------------------------
(function initPageLoader() {
  function setupLoader() {
    let loader = document.getElementById('page-loader');
    if (!loader && document.body) {
      loader = document.createElement('div');
      loader.className = 'pm-page-loader';
      loader.id = 'page-loader';
      loader.setAttribute('aria-hidden', 'true');
      loader.innerHTML = `
        <div class="pm-loader-particles">
          <div class="pm-loader-particle"></div>
          <div class="pm-loader-particle"></div>
          <div class="pm-loader-particle"></div>
          <div class="pm-loader-particle"></div>
          <div class="pm-loader-particle"></div>
        </div>
        <div class="pm-loader-inner">
          <div class="pm-loader-emblem">
            <div class="pm-loader-ring"></div>
            <div class="pm-loader-ring-inner"></div>
            <div class="pm-loader-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15 8H13L16 13H14L18 19H6L10 13H8L11 8H9L12 2Z"/>
                <rect x="11" y="19" width="2" height="3" fill="#D4A017"/>
                <polygon points="12,1 12.8,2.8 14.8,2.8 13.2,4 13.8,5.8 12,4.6 10.2,5.8 10.8,4 9.2,2.8 11.2,2.8" fill="#FFF3C4"/>
              </svg>
            </div>
          </div>
          <h2 class="pm-loader-title">Pinecrest Meadows</h2>
          <p class="pm-loader-subtitle">Fresh Evergreen Harvest &bull; Est. 1984</p>
          <div class="pm-loader-progress-track">
            <div class="pm-loader-progress-bar"></div>
          </div>
        </div>
      `;
      document.body.prepend(loader);
    }

    const startTime = Date.now();
    const minDisplayTime = 500;

    function hideLoader() {
      const currentLoader = document.getElementById('page-loader') || loader;
      if (!currentLoader) return;
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDisplayTime - elapsed);
      setTimeout(() => {
        currentLoader.classList.add('loaded');
        setTimeout(() => {
          if (currentLoader.parentNode) currentLoader.remove();
        }, 580);
      }, remaining);
    }

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
      setTimeout(hideLoader, 2200);
    }
  }

  if (document.body) {
    setupLoader();
  } else {
    document.addEventListener('DOMContentLoaded', setupLoader);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark)
  const themeToggleBtns = document.querySelectorAll('#theme-toggle, .theme-toggle-btn, #theme-toggle-btn');
  const rtlToggleBtns = document.querySelectorAll('#rtl-toggle, .rtl-toggle-btn, #rtl-toggle-btn');
  const hamburgerBtn = document.getElementById('hamburger-btn') || document.getElementById('hamburger-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const backToTopBtn = document.getElementById('back-to-top');
  const siteHeader = document.getElementById('site-header');

  const savedTheme = localStorage.getItem('pm_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateAllThemeIcons(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('pm_theme', newTheme);
      updateAllThemeIcons(newTheme);
    });
  });

  function updateAllThemeIcons(theme) {
    const sunIcon = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    const moonIcon = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    themeToggleBtns.forEach(btn => {
      if (theme === 'dark') {
        btn.innerHTML = sunIcon;
        btn.setAttribute('title', 'Switch to Light Mode');
      } else {
        btn.innerHTML = moonIcon;
        btn.setAttribute('title', 'Switch to Dark Mode');
      }
    });
  }

  // 2. RTL Management
  const savedDir = localStorage.getItem('pm_direction') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
  updateAllRtlButtons(savedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('pm_direction', newDir);
      updateAllRtlButtons(newDir);
    });
  });

  function updateAllRtlButtons(dir) {
    rtlToggleBtns.forEach(btn => {
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR Direction' : 'Switch to RTL Direction');
    });
  }

  // 3. Mobile Navigation Drawer
  const drawerGroups = document.querySelectorAll('.drawer-link-group');

  // Accordion toggle for Home and other drawer link groups
  drawerGroups.forEach(group => {
    const trigger = group.querySelector('.drawer-link');
    if (trigger) {
      trigger.style.cursor = 'pointer';
      trigger.addEventListener('click', (e) => {
        // If clicking a group trigger (not a direct link), toggle dropdown
        e.preventDefault();
        e.stopPropagation();
        const isOpen = group.classList.contains('open');
        // Close other groups if needed
        drawerGroups.forEach(g => {
          if (g !== group) g.classList.remove('open');
        });
        group.classList.toggle('open', !isOpen);
      });
    }
  });

  function openMobileMenu() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.add('open');
      drawerBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (hamburgerBtn) hamburgerBtn.classList.add('open');
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (hamburgerBtn) hamburgerBtn.classList.remove('open');

      // Auto-collapse all drawer dropdowns whenever the mobile menu is closed
      drawerGroups.forEach(group => group.classList.remove('open'));
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  const drawerLinks = document.querySelectorAll('a.drawer-link, a.drawer-sublink');
  drawerLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // Desktop Nav Dropdown Toggle (Supports Click, Hover, and Touch on all viewports e.g., Nest Hub Max / Tablets / Desktops)
  const desktopDropdowns = document.querySelectorAll('.nav-item-dropdown');
  desktopDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-link');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth > 1024) {
          const isCurrentlyOpen = dropdown.classList.contains('open');
          // Close any other open dropdowns
          desktopDropdowns.forEach(d => {
            if (d !== dropdown) {
              d.classList.remove('open');
              const t = d.querySelector('.nav-link');
              if (t) t.setAttribute('aria-expanded', 'false');
            }
          });
          if (!isCurrentlyOpen) {
            e.preventDefault();
            dropdown.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
          } else {
            trigger.setAttribute('aria-expanded', 'false');
          }
        }
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      desktopDropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
        const trigger = dropdown.querySelector('.nav-link');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 4. Header Scroll Listener & Back to Top
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Interactive Cart & Favorite Toasts
  let cartCount = 3;
  let favCount = 5;
  const cartBadge = document.getElementById('cart-count-badge') || document.querySelector('.cart-badge');
  let toastTimer = null;
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    // Clear previous toasts to prevent duplicate / stacked toasts
    container.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = 'pm-toast';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(16px)';
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-12px)';
      setTimeout(() => {
        if (toast.parentNode) toast.remove();
      }, 350);
    }, 2800);
  }

  window.showToast = showToast;

  // ==========================================================================
  // UNIVERSAL PERSISTENT CART & WISHLIST SYSTEM (localStorage Synchronized)
  // ==========================================================================
  const productImages = {
    'classic fraser fir': 'assets/images/products/tree-fraser-fir.jpg',
    'premium fraser fir': 'assets/images/products/tree-fraser-fir.jpg',
    'royal noble fir': 'assets/images/products/tree-noble-fir.jpg',
    'regal noble fir': 'assets/images/products/tree-noble-fir.jpg',
    'cascade douglas fir': 'assets/images/products/tree-douglas-fir.jpg',
    'pyramidal douglas fir': 'assets/images/products/tree-douglas-fir.jpg',
    'grand cascade douglas fir': 'assets/images/products/tree-douglas-fir.jpg',
    'heritage balsam fir': 'assets/images/products/tree-balsam-fir.jpg',
    'fragrant balsam fir': 'assets/images/products/tree-balsam-fir.jpg',
    'colorado blue spruce': 'assets/images/products/tree-blue-spruce.jpg',
    'pacific blue spruce': 'assets/images/products/tree-blue-spruce.jpg',
    'appalachian canaan fir': 'assets/images/products/tree-canaan-fir.jpg',
    'seeded eucalyptus & fir wreath': 'assets/images/products/wreath-eucalyptus.jpg',
    'highland winterberry & cedar': 'assets/images/products/wreath-berry.jpg',
    'mountain berry noble wreath': 'assets/images/products/wreath-berry.jpg',
    'frosted mountain juniper wreath': 'assets/images/products/wreath-juniper.jpg',
    '9-ft velvet magnolia garland': 'assets/images/products/garland-magnolia.jpg',
    '6-ft cascading cedar garland': 'assets/images/products/garland-cedar.jpg',
    'western cedar garland': 'assets/images/products/garland-cedar.jpg',
    'cypress & berry table runner': 'assets/images/products/garland-cypress.jpg',
    'hand-blown glass baubles set': 'assets/images/products/ornaments-display.jpg',
    'cast iron & brass tree stand': 'assets/images/products/decor-stand.jpg',
    'cast-iron reservoir stand': 'assets/images/products/decor-stand.jpg',
    '1000-led micro cluster lights': 'assets/images/products/decor-lights.jpg',
    'warm glow led fairy lights': 'assets/images/products/decor-lights.jpg',
    'winter pine & amber candle': 'assets/images/products/decor-candle.jpg',
    'winter fir & clove soy candle': 'assets/images/products/decor-candle.jpg',
    'winter fir soy candle': 'assets/images/products/decor-candle.jpg',
    'brass starburst tree topper': 'assets/images/products/decor-topper.jpg',
    'handcrafted brass star topper': 'assets/images/products/decor-topper.jpg',
    'quilted velvet tree skirt': 'assets/images/products/decor-skirt.jpg',
    'quilted linen tree skirt': 'assets/images/products/decor-skirt.jpg'
  };

  function getProductImage(title, fallback) {
    if (fallback && typeof fallback === 'string' && fallback.includes('/') && !fallback.includes('[object')) {
      return fallback;
    }
    const key = (title || '').toLowerCase().trim();
    for (const [k, v] of Object.entries(productImages)) {
      if (key.includes(k) || k.includes(key)) {
        return v;
      }
    }
    return 'assets/images/products/tree-fraser-fir.jpg';
  }

  const defaultCart = [
    {
      id: 'cart-item-1',
      title: 'Premium Fraser Fir (7–8 ft)',
      price: 115,
      qty: 1,
      img: 'assets/images/products/tree-fraser-fir.jpg',
      meta: 'Size: 7–8 ft • Prep: Straight Base Cut & Netting Free'
    },
    {
      id: 'cart-item-2',
      title: 'Mountain Berry Noble Wreath (24")',
      price: 48,
      qty: 1,
      img: 'assets/images/products/wreath-berry.jpg',
      meta: 'Style: Red Velvet Bow • Fragrance: Mountain Juniper & Cedar'
    },
    {
      id: 'cart-item-3',
      title: 'Cast-Iron Reservoir Stand (Large)',
      price: 62,
      qty: 1,
      img: 'assets/images/products/decor-stand.jpg',
      meta: 'Capacity: 2.0 Gal Reservoir • Fit: Up to 10ft trees'
    }
  ];

  window.getCart = function() {
    try {
      const stored = localStorage.getItem('pm_cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Sanitize any invalid or broken image references from earlier clicks
          parsed.forEach(item => {
            item.img = getProductImage(item.title, item.img);
          });
          return parsed;
        }
      }
    } catch(e) {}
    localStorage.setItem('pm_cart', JSON.stringify(defaultCart));
    return defaultCart;
  };

  window.saveCart = function(cart) {
    try {
      localStorage.setItem('pm_cart', JSON.stringify(cart));
    } catch(e) {}
    window.updateCartBadge();
  };

  window.updateCartBadge = function() {
    const cart = window.getCart();
    const count = cart.reduce((sum, item) => sum + (parseInt(item.qty) || 1), 0);
    document.querySelectorAll('.cart-badge, #header-cart-count, #cart-count-badge, .nav-badge.cart-badge').forEach(el => {
      el.textContent = count;
      el.style.transform = 'scale(1.25)';
      setTimeout(() => { el.style.transform = 'scale(1)'; }, 200);
    });
  };

  window.addToCart = function(title, price, img, meta, btn) {
    if (img && typeof img !== 'string') {
      btn = img;
      img = null;
    }
    if (meta && typeof meta !== 'string') {
      btn = meta;
      meta = null;
    }

    const cart = window.getCart();
    let numPrice = 50;
    if (typeof price === 'number') {
      numPrice = price;
    } else if (typeof price === 'string') {
      numPrice = parseFloat(price.replace(/[^0-9.]/g, '')) || 50;
    }
    const cleanTitle = (title || 'Holiday Item').trim();
    const finalImg = getProductImage(cleanTitle, img);

    // Check if already in cart
    const existing = cart.find(item => item.title && item.title.toLowerCase() === cleanTitle.toLowerCase());
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
      existing.img = finalImg;
    } else {
      cart.push({
        id: 'cart-item-' + Date.now(),
        title: cleanTitle,
        price: numPrice,
        qty: 1,
        img: finalImg,
        meta: meta || 'Fresh Cut & Netting Included'
      });
    }

    window.saveCart(cart);
    showToast(`Added <strong>${cleanTitle}</strong> ($${numPrice.toFixed(2)}) to holiday cart!`);

    if (btn && btn.classList) {
      if (!btn.dataset.originalHtml) {
        btn.dataset.originalHtml = btn.innerHTML;
      }
      if (btn._resetTimer) {
        clearTimeout(btn._resetTimer);
      }
      btn.classList.add('in-cart');
      
      const isIconButton = btn.classList.contains('product-action-btn') || 
                           btn.classList.contains('action-btn') || 
                           btn.offsetWidth <= 48 || 
                           (!btn.textContent.trim() && btn.querySelector('svg'));

      if (isIconButton) {
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      } else {
        btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Added</span>`;
      }

      btn._resetTimer = setTimeout(() => {
        if (btn.dataset.originalHtml) {
          btn.innerHTML = btn.dataset.originalHtml;
          delete btn.dataset.originalHtml;
        }
        btn.classList.remove('in-cart');
        delete btn._resetTimer;
      }, 1500);
    }

    if (typeof window.renderCartPage === 'function') {
      window.renderCartPage();
    }
  };

  // Initial Badge Setup
  window.updateCartBadge();

  // Delegated Add to Cart Click Handler
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.product-action-btn, .h2-add-btn, .prod-add-btn, .wishlist-btn-add, .h2-bundle-add-btn, [data-action="add-to-cart"]');
    if (!btn) return;
    
    if (btn.hasAttribute('onclick') && (btn.getAttribute('onclick').includes('addToCart') || btn.getAttribute('onclick').includes('moveItemToCart') || btn.getAttribute('onclick').includes('addUpsellItem'))) {
      return;
    }

    e.preventDefault();
    const card = btn.closest('.product-card, .h2-prod-card, .prod-card, .wreath-card, .variety-card-display, .wishlist-card, .bundle-tier-card');
    let title = 'Holiday Item';
    let price = '$50.00';
    let img = 'assets/images/products/tree-fraser-fir.jpg';
    let meta = 'Farm Fresh Harvest';

    if (card) {
      const titleEl = card.querySelector('.product-title, .variety-name, .wreath-title, .prod-card-title, .wishlist-title, .bundle-name, h3');
      if (titleEl) title = titleEl.textContent.trim();

      const priceEl = card.querySelector('.product-price, .variety-price, .wreath-price, .prod-card-price, .wishlist-price, .bundle-price, strong');
      if (priceEl) price = priceEl.textContent.trim();

      const imgEl = card.querySelector('img');
      if (imgEl && imgEl.getAttribute('src')) img = imgEl.getAttribute('src');
    }

    window.addToCart(title, price, img, meta, btn);
  });

  // --------------------------------------------------------------------------
  // UNIVERSAL WISHLIST SYSTEM (localStorage Synchronized)
  // --------------------------------------------------------------------------
  const defaultWishlist = [
    'Premium Fraser Fir (7–8 ft)',
    'Mountain Berry Noble Wreath (24")',
    'Cast-Iron Reservoir Stand (Large)',
    'Pacific Blue Spruce (8–9 ft)',
    'Western Cedar Garland (15 ft)'
  ];

  window.getWishlist = function() {
    try {
      const stored = localStorage.getItem('pm_wishlist');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch(e) {}
    localStorage.setItem('pm_wishlist', JSON.stringify(defaultWishlist));
    return defaultWishlist;
  };

  window.saveWishlist = function(list) {
    try {
      localStorage.setItem('pm_wishlist', JSON.stringify(list));
    } catch(e) {}
    window.updateWishlistBadge();
  };

  window.updateWishlistBadge = function() {
    const list = window.getWishlist();
    const count = list.length;
    document.querySelectorAll('#wishlist-count-badge, .wishlist-badge, .nav-badge:not(.cart-badge)').forEach(el => {
      el.textContent = count;
      el.style.transform = 'scale(1.25)';
      setTimeout(() => { el.style.transform = 'scale(1)'; }, 200);
    });
  };

  window.toggleWishlist = function(btn, title, price, img) {
    if (!btn) return;
    const card = btn.closest('.product-card, .h2-prod-card, .prod-card, .wreath-card, .wishlist-card') || btn;
    let cleanTitle = title;
    if (!cleanTitle && card) {
      const titleEl = card.querySelector('.product-title, .variety-name, .wreath-title, .prod-card-title, .wishlist-title, h3');
      if (titleEl) cleanTitle = titleEl.textContent.trim();
    }
    cleanTitle = (cleanTitle || 'Holiday Item').trim();

    const wishlist = window.getWishlist();
    const index = wishlist.findIndex(item => (typeof item === 'string' ? item : (item.title || '')).toLowerCase() === cleanTitle.toLowerCase());

    const svg = btn.querySelector('svg');

    if (index > -1) {
      // Remove from wishlist
      wishlist.splice(index, 1);
      window.saveWishlist(wishlist);
      btn.classList.remove('active-fav');
      btn.blur();
      btn.style.backgroundColor = '';
      btn.style.color = '';
      btn.style.borderColor = '';
      if (svg) {
        svg.setAttribute('fill', 'none');
        svg.style.color = '';
        svg.style.fill = 'none';
      }
      showToast(`Removed <strong>${cleanTitle}</strong> from holiday wishlist.`);
    } else {
      // Add to wishlist
      wishlist.push(cleanTitle);
      window.saveWishlist(wishlist);
      btn.classList.add('active-fav');
      btn.blur();
      if (svg) {
        svg.setAttribute('fill', '#FFFFFF');
        svg.style.color = '#FFFFFF';
        svg.style.fill = '#FFFFFF';
      }
      showToast(`Saved <strong>${cleanTitle}</strong> to holiday wishlist!`);
    }

    if (typeof window.updateWishlistCounts === 'function') {
      window.updateWishlistCounts();
    }
  };

  // Sync initial heart button states on load
  function syncWishlistButtons() {
    const wishlist = window.getWishlist();
    const heartBtns = document.querySelectorAll('.product-fav-btn, .prod-icon-btn, .h2-prod-fav-btn');
    heartBtns.forEach(btn => {
      const card = btn.closest('.product-card, .h2-prod-card, .prod-card, .wreath-card');
      if (card) {
        const titleEl = card.querySelector('.product-title, .variety-name, .wreath-title, .prod-card-title, h3');
        if (titleEl) {
          const t = titleEl.textContent.trim().toLowerCase();
          const inList = wishlist.some(item => (typeof item === 'string' ? item : (item.title || '')).toLowerCase() === t);
          const svg = btn.querySelector('svg');
          if (inList) {
            btn.classList.add('active-fav');
            if (svg) {
              svg.setAttribute('fill', '#FFFFFF');
              svg.style.color = '#FFFFFF';
              svg.style.fill = '#FFFFFF';
            }
          } else {
            btn.classList.remove('active-fav');
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.borderColor = '';
            if (svg) {
              svg.setAttribute('fill', 'none');
              svg.style.color = '';
              svg.style.fill = 'none';
            }
          }
        }
      }
    });
  }

  // Delegated Wishlist Button Click
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.product-fav-btn, .prod-icon-btn, .h2-prod-fav-btn');
    if (!btn) return;
    if (btn.hasAttribute('onclick') && btn.getAttribute('onclick').includes('toggleWishlist')) {
      return; // Handled by inline onclick
    }
    e.preventDefault();
    window.toggleWishlist(btn);
  });

  // Initial Sync on DOM Ready
  window.updateWishlistBadge();
  syncWishlistButtons();

  // Height Pill Selection (Home 2)
  const heightPills = document.querySelectorAll('.height-pill');
  heightPills.forEach(pill => {
    pill.addEventListener('click', () => {
      heightPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      showToast(`Selected size: <strong>${pill.textContent.trim()}</strong>`);
    });
  });

  // 6. Interactive Tree Variety Selector (Home 2)
  const varietyData = {
    nordmann: {
      name: 'Nordmann Fir',
      desc: 'The European royal favorite known for exceptional needle retention, soft non-drop needles, and glossy rich forest-green color. Perfect for warm living rooms.',
      image: 'assets/images/home2/nordmann-showcase.jpg',
      price: '$98.00',
      retention: '99%',
      fragrance: '75%',
      strength: '95%',
      softness: '98%'
    },
    concolor: {
      name: 'Concolor White Fir',
      desc: 'Celebrated for long, soft silvery-blue needles and an intoxicating natural citrus-orange aroma. Outstanding needle longevity with unique winter elegance.',
      image: 'assets/images/home2/h2-tree-concolor.jpg',
      price: '$92.00',
      retention: '94%',
      fragrance: '98%',
      strength: '88%',
      softness: '95%'
    },
    canaan: {
      name: 'Canaan Fir',
      desc: 'The perfect cross blending Fraser fir bough strength with Balsam aroma. Dense symmetrical pyramid shape with deep emerald sheen.',
      image: 'assets/images/home2/h2-tree-canaan.jpg',
      price: '$86.00',
      retention: '96%',
      fragrance: '92%',
      strength: '94%',
      softness: '90%'
    },
    grand: {
      name: 'Grand Fir',
      desc: 'Stately and majestic with glossy two-tiered needles that release a rich pine-sugar citrus fragrance. Excellent full coverage for large rooms.',
      image: 'assets/images/home2/h2-tree-grand.jpg',
      price: '$110.00',
      retention: '90%',
      fragrance: '95%',
      strength: '92%',
      softness: '94%'
    }
  };

  const varietyTabs = document.querySelectorAll('.variety-tab-btn');
  const varietyCard = document.getElementById('variety-card-display');

  if (varietyTabs.length > 0 && varietyCard) {
    varietyTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        varietyTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.getAttribute('data-variety');
        const data = varietyData[key];
        if (data) {
          const imgEl = varietyCard.querySelector('.variety-media img');
          const nameEl = varietyCard.querySelector('.variety-name');
          const descEl = varietyCard.querySelector('.variety-desc');
          const priceEl = varietyCard.querySelector('.variety-price');
          const retEl = varietyCard.querySelector('.metric-retention');
          const retVal = varietyCard.querySelector('.val-retention');
          const fragEl = varietyCard.querySelector('.metric-fragrance');
          const fragVal = varietyCard.querySelector('.val-fragrance');
          const strEl = varietyCard.querySelector('.metric-strength');
          const strVal = varietyCard.querySelector('.val-strength');
          const softEl = varietyCard.querySelector('.metric-softness');
          const softVal = varietyCard.querySelector('.val-softness');

          if (imgEl) imgEl.src = data.image;
          if (nameEl) nameEl.textContent = data.name;
          if (descEl) descEl.textContent = data.desc;
          if (priceEl) priceEl.textContent = data.price;
          if (retEl) retEl.style.width = data.retention;
          if (retVal) retVal.textContent = data.retention;
          if (fragEl) fragEl.style.width = data.fragrance;
          if (fragVal) fragVal.textContent = data.fragrance;
          if (strEl) strEl.style.width = data.strength;
          if (strVal) strVal.textContent = data.strength;
          if (softEl) softEl.style.width = data.softness;
          if (softVal) softVal.textContent = data.softness;
        }
      });
    });
  }

  // Newsletter Submit
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        showToast(`Thank you! Festive farm updates sent to ${input.value}`);
        input.value = '';
      }
    });
  });

  // 7. Password Eye Toggle
  const pwdToggleBtns = document.querySelectorAll('.pwd-toggle-btn');
  pwdToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const inputWrapper = btn.closest('.auth-input-wrapper');
      const input = inputWrapper ? inputWrapper.querySelector('input') : null;
      if (input) {
        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');
        
        if (isPassword) {
          // Show eye-off icon
          btn.innerHTML = `
            <svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
          `;
          btn.setAttribute('title', 'Hide password');
        } else {
          // Show standard eye icon
          btn.innerHTML = `
            <svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          `;
          btn.setAttribute('title', 'Show password');
        }
      }
    });
  });

  // 8. Auth Forms Handling
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('login-email');
      const email = emailInput ? emailInput.value : '';
      showToast(`Welcome back! Portal access granted for <strong>${email}</strong>`);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1400);
    });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('reg-fullname');
      const name = nameInput ? nameInput.value : 'Family';
      showToast(`Welcome to the Pinecrest Grove Family, <strong>${name}</strong>!`);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1400);
    });
  }

  const forgotPwdLink = document.getElementById('forgot-password-link');
  if (forgotPwdLink) {
    forgotPwdLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = prompt('Enter your registered email address to receive password reset instructions:');
      if (email) {
        showToast(`Reset instructions dispatched to <strong>${email}</strong>`);
      }
    });
  }

  // 9. Back to Top Smooth Scroll Handler
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 280) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 10. Custom Size Dropdown Handler (Themed tree height selectors)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.custom-size-trigger');
    const item = e.target.closest('.custom-size-item');
    
    // Close other dropdowns
    document.querySelectorAll('.custom-size-dropdown.open').forEach(dropdown => {
      if (!trigger || dropdown !== trigger.closest('.custom-size-dropdown')) {
        dropdown.classList.remove('open');
        const btn = dropdown.querySelector('.custom-size-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });

    if (trigger) {
      e.stopPropagation();
      const parent = trigger.closest('.custom-size-dropdown');
      if (parent) {
        const isOpen = parent.classList.toggle('open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    } else if (item) {
      e.stopPropagation();
      const parent = item.closest('.custom-size-dropdown');
      if (parent) {
        parent.querySelectorAll('.custom-size-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        const sizeVal = item.textContent.trim();
        const valSpan = parent.querySelector('.size-val');
        if (valSpan) valSpan.textContent = sizeVal;
        parent.classList.remove('open');
        const btn = parent.querySelector('.custom-size-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        showToast(`Height selected: <strong>${sizeVal}</strong>`);
      }
    }
  });

  // 11. Products Category Filter Buttons (Lock active state on click & smooth scroll)
  const filterBtns = document.querySelectorAll('.prod-filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            e.preventDefault();
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const headerOffset = 90;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // 12. Universal Custom Form Select Enhancer (Clamps to 100% width, theme styling, zero blue color)
  function initCustomFormSelects() {
    const nativeSelects = document.querySelectorAll('select.prod-form-select, select.contact-select');
    nativeSelects.forEach(select => {
      if (select.parentNode.classList.contains('custom-select-wrapper')) return;

      select.style.display = 'none';

      const wrapper = document.createElement('div');
      wrapper.className = 'custom-select-wrapper';

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'custom-select-trigger';
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');

      const label = document.createElement('span');
      label.className = 'custom-select-label';
      const selectedOption = select.options[select.selectedIndex] || select.options[0];
      label.textContent = selectedOption ? selectedOption.textContent : 'Select an option';

      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arrow.setAttribute('class', 'custom-select-arrow');
      arrow.setAttribute('width', '12');
      arrow.setAttribute('height', '12');
      arrow.setAttribute('viewBox', '0 0 24 24');
      arrow.setAttribute('fill', 'none');
      arrow.setAttribute('stroke', 'currentColor');
      arrow.setAttribute('stroke-width', '2.5');
      arrow.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';

      trigger.appendChild(label);
      trigger.appendChild(arrow);

      const menu = document.createElement('div');
      menu.className = 'custom-select-options';
      menu.setAttribute('role', 'listbox');

      Array.from(select.options).forEach((opt, idx) => {
        const optionItem = document.createElement('div');
        optionItem.className = 'custom-select-option' + (idx === select.selectedIndex ? ' selected' : '');
        optionItem.setAttribute('role', 'option');
        optionItem.setAttribute('data-value', opt.value);
        optionItem.textContent = opt.textContent;

        optionItem.addEventListener('click', (e) => {
          e.stopPropagation();
          menu.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('selected'));
          optionItem.classList.add('selected');
          label.textContent = opt.textContent;
          select.value = opt.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          wrapper.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        });

        menu.appendChild(optionItem);
      });

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close any other open dropdowns
        document.querySelectorAll('.custom-select-wrapper.open, .custom-size-dropdown.open').forEach(d => {
          if (d !== wrapper) {
            d.classList.remove('open');
            const b = d.querySelector('.custom-select-trigger, .custom-size-trigger');
            if (b) b.setAttribute('aria-expanded', 'false');
          }
        });
        const isOpen = wrapper.classList.toggle('open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);
      wrapper.appendChild(trigger);
      wrapper.appendChild(menu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.custom-select-wrapper')) {
        document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
          w.classList.remove('open');
          const b = w.querySelector('.custom-select-trigger');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  initCustomFormSelects();
});



