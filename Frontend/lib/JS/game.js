// import {getSessionCards, chooseCard, getSessionInfo, endSession, getLeaderboard, getUserStats, auth} from '../services/api.js'

// document.addEventListener('DOMContentLoaded', function() {
//     const cardContainer = document.getElementById('card-container');
//       // Populate cards
//   function populateCards(cards) {
//     cardContainer.innerHTML = ''; // Clear previous cards
//     cards.forEach(card => {
//       const cardElement = document.createElement('article');
//       cardElement.className = 'card';
//       cardElement.innerHTML = `
//         <div class="card-inner">
//           <div class="card-front">
//             <header><h2>${card.name}</h2></header>
//             <figure>
//               <img src="${card.image_url}" alt="${card.name}">
//             </figure>
//             <p>${card.description}</p>
//           </div>
//         </div>
//       `;
//       cardContainer.appendChild(cardElement);
//     });
//   }

//   // Add event listener to the card container
// //   cardContainer.addEventListener('click', async function (event) {
// //     if (event.target.closest('.card')) {
// //       const cards = await getSessionCards();
// //       populateCards(cards);
// //     }
// //   });
// const cards = getSessionCards();
// populateCards(cards);
// });


