/* =============================================
   EAA CONSULTATION PAGE — consultation.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── FILE UPLOAD DISPLAY ── */
  const fileInput   = document.getElementById('cf-file-upload');
  const fileDisplay = document.getElementById('cf-document');

  if (fileInput && fileDisplay) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        fileDisplay.value = fileInput.files[0].name;
      }
    });
  }

  /* ── FORM VALIDATION & SUBMIT ── */
  const form        = document.getElementById('consultForm');
  const submitBtn   = document.getElementById('consultSubmitBtn');
  const successMsg  = document.getElementById('consultSuccess');
  const checkboxErr = document.getElementById('checkboxError');

  if (!form) return;

  /* Clear errors on input */
  form.querySelectorAll('input:not([type="checkbox"]):not([type="file"]), select').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('has-error');
      const err = field.closest('.cform-group')?.querySelector('.cform-error');
      if (err) err.classList.remove('visible');
    });
    field.addEventListener('change', () => field.classList.remove('has-error'));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    /* Required text / email / tel */
    form.querySelectorAll('input[required]:not([type="checkbox"])').forEach(field => {
      const err = field.closest('.cform-group')?.querySelector('.cform-error');
      const empty = !field.value.trim();
      const badEmail = field.type === 'email' && field.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

      if (empty || badEmail) {
        field.classList.add('has-error');
        if (err) err.classList.add('visible');
        valid = false;
      } else {
        field.classList.remove('has-error');
        if (err) err.classList.remove('visible');
      }
    });

    /* Checkboxes */
    const confirmBox = form.querySelector('#cf-confirm');
    const privacyBox = form.querySelector('#cf-privacy');
    let checkValid   = true;

    if (confirmBox && !confirmBox.checked) checkValid = false;
    if (privacyBox && !privacyBox.checked) checkValid = false;

    if (!checkValid) {
      checkboxErr.textContent = 'Please confirm the information and agree to the privacy policy.';
      checkboxErr.classList.add('visible');
      valid = false;
    } else {
      checkboxErr.textContent = '';
      checkboxErr.classList.remove('visible');
    }

    if (!valid) {
      /* Scroll to first error */
      const firstErr = form.querySelector('.has-error, .cform-error.visible');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    /* Simulate async submit */
    submitBtn.textContent = 'Submitting…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      if (fileDisplay) fileDisplay.value = '';
      submitBtn.textContent = 'Submit Consultation Request';
      submitBtn.disabled = false;
      successMsg.classList.add('visible');
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => successMsg.classList.remove('visible'), 8000);
    }, 1400);
  });

  /* ── NEWSLETTER ── */
  const newsletter = document.getElementById('newsletterForm');
  if (newsletter) {
    newsletter.addEventListener('submit', e => {
      e.preventDefault();
      const input = newsletter.querySelector('.newsletter-input');
      const btn   = newsletter.querySelector('.newsletter-submit');
      const valid = input.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
      if (valid) {
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