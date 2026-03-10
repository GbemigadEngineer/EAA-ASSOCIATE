/* =============================================
   EAA SHARED MODAL — modal.js
   Call EAAModal.success(title, message) or
        EAAModal.error(title, message)
   from any page / form handler.
   ============================================= */

const EAAModal = (() => {

  /* Build the overlay once and append to body */
  const OVERLAY_ID = 'eaaModalOverlay';

  function _getOrCreate() {
    let overlay = document.getElementById(OVERLAY_ID);
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.className = 'eaa-modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'eaaModalTitle');

    overlay.innerHTML = `
      <div class="eaa-modal">
        <button class="eaa-modal-dismiss" aria-label="Close">&times;</button>
        <div class="eaa-modal-body">
          <div class="eaa-modal-icon">
            <svg id="eaaModalIcon" viewBox="0 0 24 24" aria-hidden="true"></svg>
          </div>
          <h2 class="eaa-modal-title" id="eaaModalTitle"></h2>
          <p  class="eaa-modal-message" id="eaaModalMessage"></p>
          <button class="eaa-modal-close" id="eaaModalCloseBtn">OK</button>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    /* Close on dismiss ×, OK button, or overlay click */
    const close = () => _close(overlay);
    overlay.querySelector('.eaa-modal-dismiss').addEventListener('click', close);
    overlay.querySelector('#eaaModalCloseBtn').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    /* Close on Escape */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });

    return overlay;
  }

  function _close(overlay) {
    overlay.classList.remove('is-open', 'is-error');
    document.body.style.overflow = '';
  }

  function _show({ type = 'success', title, message }) {
    const overlay = _getOrCreate();
    const icon    = overlay.querySelector('#eaaModalIcon');
    const titleEl = overlay.querySelector('#eaaModalTitle');
    const msgEl   = overlay.querySelector('#eaaModalMessage');
    const closeBtn= overlay.querySelector('#eaaModalCloseBtn');

    titleEl.textContent   = title;
    msgEl.textContent     = message;
    closeBtn.textContent  = type === 'success' ? 'Great, thanks!' : 'Close';

    if (type === 'success') {
      overlay.classList.remove('is-error');
      icon.innerHTML = `<polyline points="20 6 9 17 4 12"/>`;
    } else {
      overlay.classList.add('is-error');
      icon.innerHTML = `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`;
    }

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    /* Focus the close button for accessibility */
    setTimeout(() => closeBtn.focus(), 50);
  }

  return {
    success: (title, message) => _show({ type: 'success', title, message }),
    error:   (title, message) => _show({ type: 'error',   title, message }),
  };

})();