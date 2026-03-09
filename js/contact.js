/* =============================================
   EAA CONTACT PAGE — contact.js
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ── CONTACT FORM VALIDATION & NETLIFY SUBMIT ── */
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const successMsg = document.getElementById("formSuccess");
  const privacyErr = document.getElementById("privacyError");

  if (!form) return;

  /* Live error clearing on input */
  form.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("has-error");
      const err = field.closest(".form-group")?.querySelector(".form-error");
      if (err) err.classList.remove("visible");
    });
    field.addEventListener("change", () => {
      field.classList.remove("has-error");
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;

    /* Required text / email / tel inputs */
    form
      .querySelectorAll('input[required]:not([type="checkbox"])')
      .forEach((field) => {
        const err = field.closest(".form-group")?.querySelector(".form-error");
        if (!field.value.trim()) {
          field.classList.add("has-error");
          if (err) err.classList.add("visible");
          valid = false;
        } else if (
          field.type === "email" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
        ) {
          field.classList.add("has-error");
          if (err) err.classList.add("visible");
          valid = false;
        } else {
          field.classList.remove("has-error");
          if (err) err.classList.remove("visible");
        }
      });

    /* Textarea */
    form.querySelectorAll("textarea[required]").forEach((field) => {
      const err = field.closest(".form-group")?.querySelector(".form-error");
      if (!field.value.trim()) {
        field.classList.add("has-error");
        if (err) err.classList.add("visible");
        valid = false;
      } else {
        field.classList.remove("has-error");
        if (err) err.classList.remove("visible");
      }
    });

    /* Privacy policy checkbox */
    const checkbox = form.querySelector("#privacyPolicy");
    if (checkbox && !checkbox.checked) {
      privacyErr.textContent = "You must agree to the privacy policy.";
      privacyErr.classList.add("visible");
      valid = false;
    } else if (privacyErr) {
      privacyErr.textContent = "";
      privacyErr.classList.remove("visible");
    }

    if (!valid) return;

    /* Submit to Netlify */
    submitBtn.textContent = "Sending…";
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });
    } catch (_) {
      // Netlify will have captured it regardless
    }

    form.reset();
    submitBtn.textContent = "Send Message";
    submitBtn.disabled = false;
    successMsg.classList.add("visible");
    successMsg.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setTimeout(() => successMsg.classList.remove("visible"), 6000);
  });
});
