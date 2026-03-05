/* =============================================
   EAA CONTACT PAGE — contact.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CONTACT FORM VALIDATION & SUBMIT ── */
  const form        = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const successMsg  = document.getElementById('formSuccess');
  const privacyErr  = document.getElementById('privacyError');

  if (!form) return;

  /* Live error clearing on input */
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('has-error');
      const err = field.closest('.form-group')?.querySelector('.form-error');
      if (err) err.classList.remove('visible');
    });
    field.addEventListener('change', () => {
      field.classList.remove('has-error');
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    /* Required text / email / tel inputs */
    form.querySelectorAll('input[required]:not([type="checkbox"])').forEach(field => {
      const err = field.closest('.form-group')?.querySelector('.form-error');
      if (!field.value.trim()) {
        field.classList.add('has-error');
        if (err) err.classList.add('visible');
        valid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        field.classList.add('has-error');
        if (err) err.classList.add('visible');
        valid = false;
      } else {
        field.classList.remove('has-error');
        if (err) err.classList.remove('visible');
      }
    });

    /* Textarea */
    form.querySelectorAll('textarea[required]').forEach(field => {
      const err = field.closest('.form-group')?.querySelector('.form-error');
      if (!field.value.trim()) {
        field.classList.add('has-error');
        if (err) err.classList.add('visible');
        valid = false;
      } else {
        field.classList.remove('has-error');
        if (err) err.classList.remove('visible');
      }
    });

    /* Privacy policy checkbox */
    const checkbox = form.querySelector('#privacyPolicy');
    if (checkbox && !checkbox.checked) {
      privacyErr.textContent = 'You must agree to the privacy policy.';
      privacyErr.classList.add('visible');
      valid = false;
    } else if (privacyErr) {
      privacyErr.textContent = '';
      privacyErr.classList.remove('visible');
    }

    if (!valid) return;

    /* Simulate submit */
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      successMsg.classList.add('visible');
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => successMsg.classList.remove('visible'), 6000);
    }, 1200);
  });

  /* ── NEWSLETTER FORM (contact page copy) ── */
  const newsletter = document.getElementById('newsletterForm');
  if (newsletter) {
    newsletter.addEventListener('submit', e => {
      e.preventDefault();
      const input = newsletter.querySelector('.newsletter-input');
      const btn   = newsletter.querySelector('.newsletter-submit');
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