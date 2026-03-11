// Live filter logic
const cards = document.querySelectorAll(".proj-card");
const filterLocation = document.getElementById("filterLocation");
const filterIndustry = document.getElementById("filterIndustry");
const filterSearch = document.getElementById("filterSearch");

function filterProjects() {
  const loc = filterLocation.value.toLowerCase().trim();
  const ind = filterIndustry.value.toLowerCase().trim();
  const q = filterSearch.value.toLowerCase().trim();

  cards.forEach((card) => {
    const cardLoc = (card.dataset.location || "").toLowerCase();
    const cardInd = (card.dataset.industry || "").toLowerCase();
    const cardText = card.textContent.toLowerCase();

    const locMatch = !loc || cardLoc.includes(loc);
    const indMatch = !ind || cardInd.includes(ind);
    const qMatch = !q || cardText.includes(q);

    card.style.display = locMatch && indMatch && qMatch ? "" : "none";
  });
}

[filterLocation, filterIndustry, filterSearch].forEach((el) =>
  el.addEventListener("input", filterProjects),
);

// Load More (static demo — hides button)
document.getElementById("loadMoreBtn").addEventListener("click", function () {
  this.style.display = "none";
});
