// =============================================
//  EAA ASSOCIATES — main.js
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile hamburger toggle ---
  const hamburger = document.getElementById("hamburger");
  const primaryLinks = document.getElementById("primaryLinks");

  if (hamburger && primaryLinks) {
    hamburger.addEventListener("click", () => {
      primaryLinks.classList.toggle("mobile-open");
      hamburger.classList.toggle("is-open");

      // Animate hamburger lines
      const spans = hamburger.querySelectorAll("span");
      if (hamburger.classList.contains("is-open")) {
        spans[0].style.transform = "translateY(7px) rotate(45deg)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
      } else {
        spans[0].style.transform = "";
        spans[1].style.opacity = "";
        spans[2].style.transform = "";
      }
    });
  }

  // --- Dropdown accessibility (keyboard nav) ---
  const dropdownParents = document.querySelectorAll(".has-dropdown");

  dropdownParents.forEach((item) => {
    const link = item.querySelector(".nav-link");

    // Toggle on click (works for both touch & desktop)
    link?.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains("open");

      // Close all open dropdowns first
      dropdownParents.forEach((d) => d.classList.remove("open"));

      if (!isOpen) item.classList.add("open");
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown")) {
      dropdownParents.forEach((d) => d.classList.remove("open"));
    }
  });
});
