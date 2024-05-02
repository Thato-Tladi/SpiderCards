let score = 0; // Initialize player's score
let hasScoredThisRound = false; 
let timerInterval;

const spiders = [
    { name: "Sydney Funnel-Web", description: "With highly toxic venom produced in large amounts, it is without a doubt the deadliest spider in Australia, and possibly the world.", venomous: false, image: "assets/spider1.jpg" },
    { name: "Garden Spider", description: "Common non-venomous spider known for its decorative webs.", venomous: true, image: "assets/spider2.jpg" },
    { name: "Sydney Funnel-Web", description: "With highly toxic venom produced in large amounts, it is without a doubt the deadliest spider in Australia, and possibly the world.", venomous: true, image: "assets/spider1.jpg" },
    { name: "Garden Spider", description: "Common non-venomous spider known for its decorative webs.", venomous: true, image: "assets/spider2.jpg" },
];

let currentSpiderIndex = 0;

function initializeDisplay() {
    resetTimer();
    showSpiders();
    startTimer();
}
function startTimer() {
    const timerBar = document.getElementById('timer-bar');
    timerBar.style.width = '0%'; // Initialize the width to 0% for a new round
    timerBar.classList.remove('red'); // Remove the red class if it was added previously
    let startTime = Date.now();

    timerInterval = setInterval(function() {
        let elapsedTime = Date.now() - startTime;
        let timeLeft = 30000 - elapsedTime;
        let percentageWidth = ((30000 - timeLeft) / 30000) * 80; // Calculate width as a percentage of time passed

        timerBar.style.width = `${percentageWidth}%`;

        if (timeLeft <= 10000) {
            timerBar.classList.add('red');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            automaticCardFlip();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval); // Clear existing timer if any
    hasScoredThisRound = false; // Reset the scoring flag
}

function automaticCardFlip() {
    // Assume the first card is always venomous and the second is non-venomous
    const nonVenomousIndex = currentSpiderIndex % 2 === 0 ? currentSpiderIndex + 1 : currentSpiderIndex;
    const cardToFlip = document.querySelectorAll('.card')[nonVenomousIndex];

    if (!hasScoredThisRound) {
        score -= 100; // Deduct points automatically
        updateScoreDisplay();
        displayMessage('Time up! -100 points', true);
        flipCard(cardToFlip);
    }
}

function showSpiders() {
    const container = document.getElementById('spider-cards');
    container.innerHTML = ''; // Clear previous cards

    for (let i = currentSpiderIndex; i < currentSpiderIndex + 2; i++) {
        if (i < spiders.length) {
            const spider = spiders[i];
            const cardColor = spider.venomous ? 'red' : 'green'; // Determine color based on venomous property
            container.innerHTML += `
                <section class="card" onclick="flipCard(this)">
                    <img src="${spider.image}" alt="${spider.name}">
                </section>
                <section class="card cardAnswer" style="display: none; background-color: ${cardColor};">
                    <p class="card-details">
                        <section class="cardAnswer-header">${spider.name}</section><br>
                        ${spider.description}
                    </p>
                </section>
            `;
        }
    }

    updateNavigation();
}


function showNextPair() {
    currentSpiderIndex += 2;
    if (currentSpiderIndex >= spiders.length) {
        currentSpiderIndex = 0; // Restart or handle as needed
    }
    resetTimer(); // Ensure the old timer is stopped and reset visually
    showSpiders();
    startTimer(); 
}

function updateNavigation() {
    const pageNumber = document.querySelector('.page-number');
    pageNumber.textContent = `${(currentSpiderIndex / 2) + 1} / ${Math.ceil(spiders.length / 2)}`;
}

function flipCard(element) {
    var card = element;
    var card2 = element.nextElementSibling;

        // Stop the timer when a card is selected
    clearInterval(timerInterval);
    const timerBar = document.getElementById('timer-bar');
    
    // Flipping the original card to show the backside
    card.style.transform = 'rotateY(180deg)';
    card.style.opacity = '0';
    card.style.display = 'none';
    card2.style.display = 'block';
    
    // Setting a short delay to flip the new card after the original card has flipped
    setTimeout(function() {
        card2.style.transform = 'rotateY(0deg)';
        card2.style.opacity = '1';
      }, 300); // Half the duration of the flip so it seems to flip at the same time

      var link = document.querySelector('.next.round');
      if (link.classList.contains('disabled')) {
          link.classList.remove('disabled');
        //   link.href = "your-next-page.html";
          link.removeAttribute('onclick'); // Remove the onclick attribute that prevents clicking
      }

      const spiderIndex = [...document.querySelectorAll('.card')].indexOf(element);
      const spider = spiders[spiderIndex];
      console.log(spiders[spiderIndex]);
      
  
      if (!hasScoredThisRound) {
        // Update the score only if it hasn't been updated this round
        if (spider.venomous) {
            score -= 100;
            displayMessage('Kiss of Death -100', true);
        } else {
            score += 100;
            displayMessage('You Get to Live Another Round +100', false);
        }
        
        hasScoredThisRound = true; // Set the flag indicating score has been updated
        updateScoreDisplay();
    }

    console.log("score is "+score);

    // Update the displayed score
    updateScoreDisplay();
  
      // Function to handle message display
      function displayMessage(text, isVenomous) {
          const message = document.createElement('div');
          message.style.position = 'absolute';
          message.style.top = '10%';
          message.style.left = '0';
          message.style.width = '100%';
          message.style.textAlign = 'center';
          message.style.color = isVenomous ? 'red' : 'green';
          message.style.fontSize = '2rem';
          message.style.fontWeight = 'bold';
          message.style.zIndex = '1000';
          message.textContent = text;
          document.body.appendChild(message);
  
          // Animation
          message.animate([
              { opacity: 0 },
              { opacity: 1, offset: 0.1 },
              { opacity: 1, offset: 0.9 },
              { opacity: 0 }
          ], {
              duration: 3000,
              easing: 'ease-in-out'
          });
  
          // Remove message after 3 seconds
          setTimeout(() => {
              message.remove();
          }, 3000);
      }
    }

    //function for displaying 
    function updateScoreDisplay() {
        const scoreElement = document.getElementById('score'); // Ensure you have a score element in your HTML
        if (scoreElement) {
            scoreElement.textContent = `Score: ${score}`;
        }
    }

    window.onload = function() {
        initializeDisplay();
        updateScoreDisplay(); // Initial score update
        startRound();
    }
