/* ── Navbar scroll effect ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── Smooth close mobile menu on outside click ── */
document.addEventListener('click', (e) => {
  if (!e.target.closest('#navbar')) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

/* ── Copy to clipboard ── */
function copyText(id, text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!');
    const el = document.getElementById(id);
    el.classList.add('copied');
    setTimeout(() => el.classList.remove('copied'), 1200);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied to clipboard!');
  });
}

/* ── Toast ── */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ── Form submission ── */
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  const fallbackLink = document.getElementById('waFallbackLink');

  btn.disabled = true;
  btn.querySelector('.submit-text').textContent = 'Opening WhatsApp...';

  // Get values
  const fullName = document.getElementById('fullName').value.trim();
  const rollNo = document.getElementById('rollNo').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const pickup = document.getElementById('pickup').value;
  const txnId = document.getElementById('txnId').value.trim();
  const notes = document.getElementById('notes').value.trim();

  // Format message
  const message = `*New Booking Request - Sharan Trip* 🌲\n\n` +
    `👤 *Name:* ${fullName}\n` +
    `🆔 *Roll No / ID:* ${rollNo}\n` +
    `📞 *Phone:* ${phone}\n` +
    `📍 *Pickup Location:* ${pickup}\n` +
    `💸 *Transaction ID:* ${txnId}\n` +
    `📝 *Notes:* ${notes || 'None'}`;

  // WhatsApp API URL (Phone: +92 333 2800834 -> 923332800834)
  const whatsappUrl = `https://wa.me/923332800834?text=${encodeURIComponent(message)}`;

  // Set fallback link href
  if (fallbackLink) {
    fallbackLink.href = whatsappUrl;
  }

  // Attempt to open immediately
  window.open(whatsappUrl, '_blank');

  setTimeout(() => {
    btn.style.display = 'none';
    success.classList.remove('hidden');
    document.getElementById('regForm').reset();

    // Scroll to success
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1000);
}

/* ── Scroll reveal animation ── */
const revealEls = document.querySelectorAll(
  '.timeline-day, .gallery-card, .inc-card, .payment-card, .reg-form, .stats-strip'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

/* ── Staggered children animation ── */
document.querySelectorAll('.inc-grid, .gallery-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
  });
});

/* ── Active nav link highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? '#34d399'
      : '';
  });
});

/* ── Parallax hero ── */
const heroImg = document.querySelector('.hero-img');
window.addEventListener('scroll', () => {
  if (heroImg) {
    const scrollY = window.scrollY;
    heroImg.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
  }
});
