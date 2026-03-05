/* =============================================
   EAA ASSOCIATES LTD — JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── MOBILE HAMBURGER ── */
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobileDrawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      drawer.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── SCROLL FADE-IN ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ── STICKY NAVBAR SHADOW ── */
  const navTop = document.querySelector('.navbar-top');
  window.addEventListener('scroll', () => {
    if (navTop) {
      navTop.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(0,0,0,0.1)'
        : '0 1px 0 #e0e0e0';
    }
  });

  /* ── NEWSLETTER FORM ── */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      const btn   = newsletterForm.querySelector('.newsletter-submit');
      if (input.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        btn.textContent = 'Subscribed ✓';
        btn.style.background = '#2D6A4F';
        input.value = '';
        setTimeout(() => { btn.textContent = 'Submit'; btn.style.background = ''; }, 3000);
      } else {
        input.style.background = 'rgba(220,50,50,0.15)';
        setTimeout(() => { input.style.background = ''; }, 1500);
      }
    });
  }

});