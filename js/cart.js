let cart = JSON.parse(localStorage.getItem('waggleCart')) || [];
let currentFulfillment = localStorage.getItem('waggleFulfillment') || 'delivery';

function saveCart() {
  localStorage.setItem('waggleCart', JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

function setFulfillment(type) {
  currentFulfillment = type;
  localStorage.setItem('waggleFulfillment', type);
  renderCart();
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function updateQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
  }
}

function openCart() {
  document.querySelector('.cart-overlay').classList.add('open');
}

function closeCart() {
  document.querySelector('.cart-overlay').classList.remove('open');
}

function renderCart() {
  const container = document.querySelector('.cart-items');
  if (!container) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
    const totalEl = document.querySelector('.cart-total span:last-child');
    if (totalEl) totalEl.textContent = '£0.00';
    const countEl = document.getElementById('cart-total-items');
    if (countEl) countEl.textContent = '0 items';
    const footer = document.querySelector('.cart-footer');
    if (footer) {
      footer.innerHTML = `
        <div style="margin-bottom: 16px; display: flex; gap: 8px; background: var(--cream); padding: 4px; border: 1.5px solid var(--ink); border-radius: 4px;">
          <button onclick="setFulfillment('delivery')" style="flex:1; padding: 8px; font-size: 11px; font-family: 'IBM Plex Mono', monospace; font-weight: 700; text-transform: uppercase; border: none; border-radius: 2px; cursor: pointer; background: ${currentFulfillment === 'delivery' ? 'var(--pine)' : 'transparent'}; color: ${currentFulfillment === 'delivery' ? 'var(--cream)' : 'var(--ink)'};">Delivery</button>
          <button onclick="setFulfillment('collect')" style="flex:1; padding: 8px; font-size: 11px; font-family: 'IBM Plex Mono', monospace; font-weight: 700; text-transform: uppercase; border: none; border-radius: 2px; cursor: pointer; background: ${currentFulfillment === 'collect' ? 'var(--pine)' : 'transparent'}; color: ${currentFulfillment === 'collect' ? 'var(--cream)' : 'var(--ink)'};">Click & Collect</button>
        </div>
        <div class="cart-total"><span>Subtotal</span><span>£0.00</span></div>
        <button class="cta-btn checkout-btn" onclick="window.location.assign('checkout.html')">Proceed to Checkout</button>
      `;
    }
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item" style="display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--line);">
      <img src="${item.image}" alt="${item.name}" style="width: 64px; height: 64px; object-fit: cover; border-radius: 4px; border: 1px solid var(--line);">
      <div style="flex-grow: 1;">
        <h4 style="margin: 0 0 4px; font-size: 15px;">${item.name}</h4>
        <p style="margin: 0; font-size: 13px; color: rgba(36,32,27,0.6);">£${item.price.toFixed(2)} each</p>
        <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
          <div style="display: flex; align-items: center; border: 1px solid var(--ink); border-radius: 4px;">
            <button onclick="updateQuantity('${item.id}', -1)" style="border: none; background: none; padding: 4px 10px; cursor: pointer; font-size: 16px;">-</button>
            <span style="font-weight: 600; min-width: 24px; text-align: center;">${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', 1)" style="border: none; background: none; padding: 4px 10px; cursor: pointer; font-size: 16px;">+</button>
          </div>
          <button onclick="removeFromCart('${item.id}')" style="border: none; background: none; color: var(--rust); font-size: 12px; cursor: pointer; text-decoration: underline;">Remove</button>
        </div>
      </div>
      <div style="font-weight: 700; align-self: center;">£${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');

  const countEl = document.getElementById('cart-total-items');
  if (countEl) countEl.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'}`;

  const footer = document.querySelector('.cart-footer');
  if (footer) {
    const shipping = currentFulfillment === 'collect' ? 0 : (totalCost >= 30 || totalCost === 0 ? 0 : 3.99);
    const finalTotal = totalCost + shipping;

    footer.innerHTML = `
      <div style="margin-bottom: 16px; display: flex; gap: 8px; background: var(--cream); padding: 4px; border: 1.5px solid var(--ink); border-radius: 4px;">
        <button onclick="setFulfillment('delivery')" style="flex:1; padding: 8px; font-size: 11px; font-family: 'IBM Plex Mono', monospace; font-weight: 700; text-transform: uppercase; border: none; border-radius: 2px; cursor: pointer; background: ${currentFulfillment === 'delivery' ? 'var(--pine)' : 'transparent'}; color: ${currentFulfillment === 'delivery' ? 'var(--cream)' : 'var(--ink)'};">Delivery</button>
        <button onclick="setFulfillment('collect')" style="flex:1; padding: 8px; font-size: 11px; font-family: 'IBM Plex Mono', monospace; font-weight: 700; text-transform: uppercase; border: none; border-radius: 2px; cursor: pointer; background: ${currentFulfillment === 'collect' ? 'var(--pine)' : 'transparent'}; color: ${currentFulfillment === 'collect' ? 'var(--cream)' : 'var(--ink)'};">Click & Collect</button>
      </div>
      <div style="font-size: 12px; color: rgba(36,32,27,0.7); margin-bottom: 12px;">
        ${currentFulfillment === 'collect' ? '📍 Pickup at: Wath Pet Hub Store, S65 1AA (Ready in 2h)' : (shipping === 0 ? '✨ Free Shipping applied!' : '🚚 Delivery: £3.99 (Free over £30)')}
      </div>
      <div class="cart-total"><span>Total</span><span>£${finalTotal.toFixed(2)}</span></div>
      <button class="cta-btn checkout-btn" onclick="window.location.assign('checkout.html')">Proceed to Checkout</button>
    `;
  }
}

function updateCartBadge() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector('.cart-count');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateCartBadge();

  // Close cart on overlay click
  const overlay = document.querySelector('.cart-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeCart();
    });
  }
});

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  if (navLinks && menuToggle) {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
  }
}

// Close menu when clicking outside of it
document.addEventListener('click', (e) => {
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  if (navLinks && menuToggle && navLinks.classList.contains('open')) {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  }
});

// Close menu if window is resized above mobile breakpoint
window.addEventListener('resize', () => {
  if (window.innerWidth > 860) {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navLinks && menuToggle) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  }
});
