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

  /* ── FORM VALIDATION & NETLIFY SUBMIT ── */
  const form        = document.getElementById('consultForm');
  const submitBtn   = document.getElementById('consultSubmitBtn');
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

    /* Required text / email / tel */
    form.querySelectorAll('input[required]:not([type="checkbox"])').forEach(field => {
      const err      = field.closest('.cform-group')?.querySelector('.cform-error');
      const empty    = !field.value.trim();
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
    const checkValid = (!confirmBox || confirmBox.checked) && (!privacyBox || privacyBox.checked);

    if (!checkValid) {
      checkboxErr.textContent = 'Please confirm the information and agree to the privacy policy.';
      checkboxErr.classList.add('visible');
      valid = false;
    } else {
      checkboxErr.textContent = '';
      checkboxErr.classList.remove('visible');
    }

    if (!valid) {
      const firstErr = form.querySelector('.has-error, .cform-error.visible');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    /* Submit to Netlify */
    submitBtn.textContent = 'Submitting…';
    submitBtn.disabled = true;

    let submitted = false;
    try {
      const res = await fetch('/', {
        method: 'POST',
        body: new FormData(form)   /* multipart — needed for file upload */
      });
      submitted = res.ok;
    } catch (_) {
      submitted = false;
    }

    submitBtn.textContent = 'Submit Consultation Request';
    submitBtn.disabled = false;

    if (submitted) {
      form.reset();
      if (fileDisplay) fileDisplay.value = '';
      EAAModal.success(
        'Request Submitted!',
        'Your consultation request has been received. Our team will review your project details and respond within 1–2 business days.'
      );
    } else {
      EAAModal.error(
        'Submission Failed',
        'Something went wrong while submitting your request. Please try again or contact us directly.'
      );
    }
  });

});