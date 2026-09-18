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

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
    document.querySelector('.cart-total span:last-child').textContent = '£0.00';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>£${item.price.toFixed(2)} x ${item.quantity}</p>
        <div style="display:flex; gap:10px; margin-top:8px;">
           <button onclick="updateQuantity('${item.id}', -1)" style="cursor:pointer; background:none; border:1px solid var(--ink); width:24px; height:24px;">-</button>
           <button onclick="updateQuantity('${item.id}', 1)" style="cursor:pointer; background:none; border:1px solid var(--ink); width:24px; height:24px;">+</button>
           <button onclick="removeFromCart('${item.id}')" style="cursor:pointer; background:none; border:none; color:var(--rust); font-size:11px; margin-left:auto; font-family:'IBM Plex Mono', monospace;">REMOVE</button>
        </div>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.querySelector('.cart-total span:last-child').textContent = `£${total.toFixed(2)}`;
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
