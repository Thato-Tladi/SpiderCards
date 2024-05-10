let score = 0; // Initialize player's score
let hasScoredThisRound = false;
let timerInterval;
let currentRound = 1;
let sessionId = sessionStorage.getItem('sessionId');
let cards = [];
const baseUrl = 'http://spidercards-app.eu-west-1.elasticbeanstalk.com/api/game';
const timeoutLimit = 10000; // 10 seconds

function initializeDisplay() {
    getNextCardPair();
}

function getNextCardPair() {
    const url = `${baseUrl}/session/${sessionId}/cards`;
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        cards = data.cards;
        currentRound = data.current_round;
        showSpiders();
        startTimer();
    })
    .catch(error => console.error('Error fetching card pairs:', error));
}

function submitCardChoice(cardId, isTimeout = false) {
    const url = `${baseUrl}/session/${sessionId}/choose`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ cardId, isTimeout })
    })
    .then(response => response.json())
    .then(data => {
        updateScore(data.scoreChange);
        hasScoredThisRound = true;
        displayMessage(`${data.correct ? 'Correct' : 'Incorrect'}! ${data.scoreChange > 0 ? '+' : ''}${data.scoreChange} points`, data.scoreChange > 0);

        updateSessionInfo();

        if (data.finalRound) {
            displayResult();
        } else {
            var link = document.querySelector('.next.round');
            if (link.classList.contains('disabled')) {
                link.classList.remove('disabled');
                link.removeAttribute('onclick');
            }
        }
    })
    .catch(error => console.error('Error submitting card choice:', error));
}

function updateSessionInfo() {
    const url = `${baseUrl}/session/${sessionId}/info`;
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        score = data.score;
        currentRound = data.current_round;
        updateScoreDisplay();
    })
    .catch(error => console.error('Error fetching session info:', error));
}

function endGameSession() {
    const url = `${baseUrl}/session/${sessionId}/end`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        displayResult();
    })
    .catch(error => console.error('Error ending game session:', error));
}

function startTimer() {
    const timerBar = document.getElementById('timer-bar');
    timerBar.style.width = '0%';
    timerBar.classList.remove('red');
    let startTime = Date.now();

    timerInterval = setInterval(function() {
        let elapsedTime = Date.now() - startTime;
        let timeLeft = timeoutLimit - elapsedTime;
        let percentageWidth = ((timeoutLimit - timeLeft) / timeoutLimit) * 80;

        timerBar.style.width = `${percentageWidth}%`;

        if (timeLeft <= 5000) {
            timerBar.classList.add('red');
        }

        if (timeLeft <= 0) {
            displayMessage('Time up! -100 points', true);
            score -= 100;
            hasScoredThisRound = true;
            submitCardChoice(cards[0].card_id, true);

            var link = document.querySelector('.next.round');
            if (link.classList.contains('disabled')) {
                link.classList.remove('disabled');
                link.removeAttribute('onclick');
            }

            clearInterval(timerInterval);
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    hasScoredThisRound = false;
}

function showSpiders() {
    const container = document.getElementById('spider-cards');
    container.innerHTML = '';

    for (let i = 0; i < cards.length; i++) {
        const spider = cards[i];
        const cardColor = spider.toxicity_rating > 0 ? 'red' : 'green'; // Determine color based on toxicity_rating property
        container.innerHTML += `
            <section class="card" onclick="flipCard(this, ${spider.card_id}, ${spider.toxicity_rating > 0})">
                <img src="${spider.image_url}" alt="${spider.name}">
            </section>
            <section class="card cardAnswer" style="display: none; background-color: ${cardColor};">
                <p class="card-details">
                    <section class="cardAnswer-header">${spider.name}</section><br>
                    ${spider.description}
                </p>
            </section>
        `;
    }

    updateNavigation();
}

function showNextPair() {
    getNextCardPair();
    resetTimer();
    var link = document.querySelector('.next.round');
    if (!link.classList.contains('disabled')) {
        link.classList.add('disabled');
    }
}

function displayResult() {
    const mainContent = document.querySelector('main');
    const videoFile = score > 0 ? 'assets/win.mp4' : 'assets/lose.mp4';

    mainContent.innerHTML = `
        <h2 class="animated-text">You ${score > 0 ? 'won' : 'lost'} ${Math.abs(score)} points</h2>
        <video src="${videoFile}" autoplay loop></video>
    `;
}

function updateNavigation() {
    const pageNumber = document.querySelector('.page-number');
    pageNumber.textContent = `Round ${currentRound}`;
}

function flipCard(element, cardId, isVenomous) {
    var card = element;
    var card2 = element.nextElementSibling;


    clearInterval(timerInterval);


    card.style.transform = 'rotateY(180deg)';
    card.style.opacity = '0';
    card.style.display = 'none';
    card2.style.display = 'block';


    setTimeout(function() {
        card2.style.transform = 'rotateY(0deg)';
        card2.style.opacity = '1';
    }, 300);

    var link = document.querySelector('.next.round');
    if (link.classList.contains('disabled')) {
        link.classList.remove('disabled');
        link.removeAttribute('onclick');
    }

    if (!hasScoredThisRound) {
        submitCardChoice(cardId, false);
    }

    updateScoreDisplay();
}

function displayMessage(text, isPositive) {
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '10%';
    message.style.left = '0';
    message.style.width = '100%';
    message.style.textAlign = 'center';
    message.style.color = isPositive ? 'green' : 'red';
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

function updateScore(scoreChange) {
    score += scoreChange;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    const scoreElement = document.getElementById('score'); //insert score HTML 
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
    }
}

window.onload = function() {
    initializeDisplay();
    updateScoreDisplay(); // Initial score update
}

