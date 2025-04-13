document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.querySelector('.cards-container');

  if (!cardsContainer) {
    console.error('Error: Could not find the .cards-container element.');
    return;
  }

  fetch('./assets/data/plans.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(plans => {
      if (!Array.isArray(plans)) {
        throw new Error('Error: Fetched data is not an array.');
      }
      cardsContainer.innerHTML = ''; // Clear any existing content (like placeholders)

      plans.forEach(plan => {
        const card = document.createElement('div');
        card.classList.add('card');

        const featuresHtml = plan.features.map(feature => `
          <li>
            <i class="bi ${feature.included ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i> ${feature.text}
          </li>
        `).join('');

        card.innerHTML = `
          <h3>${plan.title}</h3>
          <p class="precio">${plan.price}</p>
          <p>${plan.description}</p>
          <ul>
            ${featuresHtml}
          </ul>
          <a href="${plan.buttonLink}" target="_blank" class="btn-contratar">${plan.buttonText}</a>
        `;

        cardsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching or processing plans data:', error);
      cardsContainer.innerHTML = '<p>Error loading pricing plans. Please try again later.</p>'; // Display error message to user
    });
});