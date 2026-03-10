/* =============================================
   EAA CONTACT PAGE — contact.js
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ── CONTACT FORM VALIDATION & NETLIFY SUBMIT ── */
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const privacyErr = document.getElementById("privacyError");

  if (!form) return;

  /* Live error clearing on input */
  form.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("has-error");
      const err = field.closest(".form-group")?.querySelector(".form-error");
      if (err) err.classList.remove("visible");
    });
    field.addEventListener("change", () => field.classList.remove("has-error"));
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
      if (privacyErr) {
        privacyErr.textContent = "You must agree to the privacy policy.";
        privacyErr.classList.add("visible");
      }
      valid = false;
    } else if (privacyErr) {
      privacyErr.textContent = "";
      privacyErr.classList.remove("visible");
    }

    if (!valid) {
      const firstErr = form.querySelector(".has-error, .form-error.visible");
      if (firstErr)
        firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    /* Submit to Netlify */
    submitBtn.textContent = "Sending…";
    submitBtn.disabled = true;

    let submitted = false;
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      submitted = res.ok;
    } catch (_) {
      submitted = false;
    }

    submitBtn.textContent = "Send Message";
    submitBtn.disabled = false;

    if (submitted) {
      form.reset();
      EAAModal.success(
        "Message Sent!",
        "Thank you for reaching out. A member of our team will get back to you within 1–2 business days.",
      );
    } else {
      EAAModal.error(
        "Submission Failed",
        "Something went wrong while sending your message. Please try again or email us directly.",
      );
    }
  });
});
