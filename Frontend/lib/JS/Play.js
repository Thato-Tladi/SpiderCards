function flipCard(element) {
    var card = element;
    var card2 = element.nextElementSibling;
    
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
  }
  
// This script could be expanded to fetch real data and update the text content
function updateProfileInfo(username, score, gamesPlayed) {
    document.getElementById('username').querySelector('.user-info').textContent = username;
    document.getElementById('score').querySelector('.user-info').textContent = score;
    document.getElementById('games-played').querySelector('.user-info').textContent = gamesPlayed;
}

// Example usage
updateProfileInfo('JaneDoe', 2300, 110);
