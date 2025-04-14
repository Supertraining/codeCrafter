document.addEventListener("DOMContentLoaded", () => {
  const themeToggleLight = document.getElementById("theme-toggle-light");
  const themeToggleDark = document.getElementById("theme-toggle-dark");

  function applyTheme(theme) {
    document.documentElement.className = theme;

    const lightIcon = document.querySelector("#theme-toggle-light i");
    const darkIcon = document.querySelector("#theme-toggle-dark i");

    if (theme === "light") {
      themeToggleLight.style.display = "none";
      themeToggleDark.style.display = "inline-block";
      lightIcon.classList.remove("bi-sun");
      lightIcon.classList.add("bi-sun-fill");
      darkIcon.classList.remove("bi-moon-stars-fill");
      darkIcon.classList.add("bi-moon-stars");
    } else {
      themeToggleLight.style.display = "inline-block";
      themeToggleDark.style.display = "none";
      lightIcon.classList.remove("bi-sun-fill");
      lightIcon.classList.add("bi-sun");
      darkIcon.classList.remove("bi-moon-stars");
      darkIcon.classList.add("bi-moon-stars-fill");
    }
  }

  // Get the theme from localStorage
  const storedTheme = localStorage.getItem("theme");

  // If there is a theme stored, apply it
  if (storedTheme) {
    applyTheme(storedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  // Function to switch the theme and store it in localStorage
  function switchTheme(theme) {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }

  // Add event listeners to the theme toggle buttons
  themeToggleLight.addEventListener("click", () => switchTheme("light"));
  themeToggleDark.addEventListener("click", () => switchTheme("dark"));

  // Apply initial theme and set icons
  applyTheme(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );


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
