document.addEventListener("DOMContentLoaded", () => {

  const cardsContainer = document.querySelector(".cards-container");

  if (!cardsContainer) {
    console.error("Error: Could not find the .cards-container element.");
    return;
  }

  fetch("./assets/data/plans.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((plans) => {
      if (!Array.isArray(plans)) {
        throw new Error("Error: Fetched data is not an array.");
      }
      cardsContainer.innerHTML = ""; // Clear any existing content (like placeholders)

      plans.forEach((plan) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const featuresHtml = plan.features
          .map((feature) => {
            const liClass = feature.included ? "feature-included" : "feature-excluded";
            const iconClass = feature.included ? feature.icon : "bi-x-circle-fill"; // Fallback if icon is missing
            return `
            <li class="${liClass}">
              <i class="bi ${iconClass}"></i> ${feature.text}
            </li>
          `;
          })
          .join("");

        const priceNoteHtml = plan.priceNote ? `<p class="price-note">${plan.priceNote}</p>` : "";

        card.innerHTML = `
          <h3>${plan.title}</h3>
          <p class="precio">${plan.price}</p>
          ${priceNoteHtml}
          <p class="description">${plan.description}</p>
          <ul>
            ${featuresHtml}
          </ul>
          <a href="${plan.buttonLink}" target="_blank" class="btn-contratar">${plan.buttonText}</a>
        `;

        cardsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching or processing plans data:", error);
      cardsContainer.innerHTML = "<p>Error loading pricing plans. Please try again later.</p>"; // Display error message to user
    });
});
