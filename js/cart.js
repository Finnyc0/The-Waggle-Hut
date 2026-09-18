let cart = JSON.parse(localStorage.getItem('waggleCart')) || [];

function saveCart() {
  localStorage.setItem('waggleCart', JSON.stringify(cart));
  renderCart();
  updateCartBadge();
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
    document.querySelector('.cart-total span:last-child').textContent = '£0.00';
    document.getElementById('cart-total-items').textContent = '0 items';
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

  document.getElementById('cart-total-items').textContent = `${totalItems} item${totalItems === 1 ? '' : 's'}`;
  document.querySelector('.cart-total span:last-child').textContent = `£${totalCost.toFixed(2)}`;
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
