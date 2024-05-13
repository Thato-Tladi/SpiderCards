let score = 0; // Initialize player's score
let hasScoredThisRound = false;
let timerInterval;
let currentRound = 1;
let sessionId = sessionStorage.getItem('sessionId');
let cards = [];
const baseUrl = 'http://spidercards-app.eu-west-1.elasticbeanstalk.com/api/game';
const timeoutLimit = 30000; // 10 seconds

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
        // loader.style.display = 'none'; // Hide loader
        cards = data.cards;
        currentRound = data.current_round;
        showSpiders();
    })
    .catch(error => {
        console.error('Error fetching card pairs:', error);
        window.location.href = 'Error.html';
    });
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
            var button = document.getElementById('next');
            button.disabled = false;
        }
    })
    .catch(error => {
        console.error('Error submitting card choice:', error);
        window.location.href = 'Error.html';
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
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
    .catch(error => {
        console.error('Error fetching session info:', error);
        window.location.href = 'Error.html';
    });
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
    .catch(error => {
        console.error('Error ending game session:', error);
        window.location.href = 'Error.html';
    });
    
}

function startTimer() {
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.classList.remove('red');
    let startTime = Date.now();

    timerInterval = setInterval(function() {
        let elapsedTime = Date.now() - startTime;
        let timeLeft = timeoutLimit - elapsedTime;
        let secondsLeft = Math.floor(timeLeft / 1000);
        let minutes = Math.floor(secondsLeft / 60);
        let seconds = secondsLeft % 60;

        // Update digital display
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Change background color to red when time is below 10 seconds
        if (timeLeft <= 10000) {
            timerDisplay.classList.add('red');
        } else {
            timerDisplay.classList.remove('red');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "00:00";
            score -= 100; // deduct score as before
            hasScoredThisRound = true;
            submitCardChoice(cards[0].card_id, true); // Auto-submit the first card

            var button = document.getElementById('next');
            button.disabled = false;
        }
    }, 1000);
}


function resetTimer() {
    clearInterval(timerInterval);
    hasScoredThisRound = false;
}

function showSpiders() {
    const container = document.getElementById('spider-cards');
    container.innerHTML = '<div class="loader"></div>';

    const timer = document.getElementById('timer-display');
    const next = document.getElementById('next');
    const pick = document.getElementById('animated-text');

    timer.style.display = next.style.display = pick.style.display = 'none';

    var button = document.getElementById('next');
    if (!button.disabled) {
        button.disabled = true;
    }

    shuffle(cards);

    // Create promises for image loading
    let promises = cards.map(spider => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = spider.image_url;
            img.alt = spider.name;

            const cardColor = spider.type_id == 1 ? 'red' : 'green'; // Determine color based on type_id property
            img.cardHTML = `
            <section class="card" onclick="flipCard(this, ${spider.card_id}, ${spider.toxicity_rating > 0})">
                <img src="${img.src}" alt="${img.alt}">
            </section>
            <section class="card cardAnswer" style="display: none; background-color: ${cardColor};">
                <p class="card-details">
                    <strong>Name:</strong> ${spider.name}<br>
                    <strong>Scientific Name:</strong> ${spider.scientific_name}<br>
                    <strong>Description:</strong> ${spider.description}<br>
                    <strong>Habitat:</strong> ${spider.habitat}<br>
                    <strong>Toxicity:</strong> ${spider.toxicity_rating}<br>
                </p>
            </section>
        `;
        });
    });

    // Wait for all images to load
    Promise.all(promises).then(images => {
        timer.style.display = next.style.display = pick.style.display = 'block';
        container.innerHTML = ''; // Clear loader
        images.forEach(img => {
            container.innerHTML += img.cardHTML;
        });

        startTimer();
        updateNavigation();
        if (button) {
            button.disabled = false;
        }
    }).catch(error => {
        console.error('An error occurred while loading images:', error);
        container.innerHTML = '<div class="error">Error loading images.</div>';

        if (button) {
            button.disabled = false;
        }
    });
}


function showNextPair() {
    
    var button = document.getElementById('next');
    if (!button.disabled) {
        button.disabled = true;
    }
    getNextCardPair();
    resetTimer();
}

function displayResult() {
    const mainContent = document.querySelector('main');
    const videoFile = score > 0 ? 'assets/win.mp4' : 'assets/lose.mp4';

    mainContent.innerHTML = `
        <h2 class="animated-text">You ${score > 0 ? 'won' : 'lost'} ${Math.abs(score)} points</h2>
        <video src="${videoFile}" autoplay loop></video>
        <br>
        <a href="index.html" class="next round">Home &raquo;</a>
    `;
}

function updateNavigation() {
    displayMessage("ROUND "+currentRound);
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
    
    const existingMessages = document.querySelectorAll('div.message');
    existingMessages.forEach(msg => msg.remove());
    
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '5%';
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