import {getSessionCards, chooseCard, getSessionInfo, endSession, getLeaderboard, getUserStats, auth} from '../services/api.js'

document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.getElementById('spider-cards');

      // Populate cards
  async function populateCards() {
    const cards = await getSessionCards();
    cardContainer.innerHTML = ''; // Clear previous cards
    console.log("our cards: "+cards.cards.card[0]);
    console.log("our cards: "+res);
    cards.forEach(card => {
      const cardElement = document.createElement('article');
      cardElement.className = 'card';
      cardElement.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <header><h2>${card.name}</h2></header>
            <figure>
              <img src="${card.image_url}" alt="${card.name}">
            </figure>
            <p>${card.description}</p>
          </div>
        </div>
      `;
      cardContainer.appendChild(cardElement);
    });
  }

populateCards();
});


