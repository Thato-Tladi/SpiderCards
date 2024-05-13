function updateLeaderboard() {
    const tbody = document.querySelector('#leaderboard tbody');
    const bearerToken = localStorage.getItem('access_token');
    // Fetch leaderboard data
    fetch('http://spidercards-app.eu-west-1.elasticbeanstalk.com/api/game/leaderboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Clear current entries and remove loader
        tbody.innerHTML = '';
<<<<<<< newbackground

        // Sort leaderboard data in descending order
        const sortedLeaderboard = data.leaderboard.sort((a, b) => b.total_score - a.total_score);
=======
        const leaderboard = document.getElementById('leaderboard');
        const loader = document.getElementById('loader');
        
        loader.style.display = 'none';
        leaderboard.style.display = 'block';

>>>>>>> pre-main
 
        // Populate leaderboard table with top 5 scores
        const top5 = sortedLeaderboard.slice(0, 5);
        top5.forEach(player => {
            let row = tbody.insertRow();
            let userIdCell = row.insertCell(0);
            let scoreCell = row.insertCell(1);
<<<<<<< newbackground
            userIdCell.textContent = player.user_id;
            scoreCell.textContent = player.total_score;
        });
=======
            nameCell.textContent = '0';
            scoreCell.textContent = '0';
        } else {
            data.leaderboard.forEach(player => {
                let row = tbody.insertRow();
                let userIdCell = row.insertCell(0);
                let scoreCell = row.insertCell(1);
                userIdCell.textContent = player.username;
                scoreCell.textContent = player.total_score;
            });
        }
>>>>>>> pre-main
    })
    .catch(error => {
        console.error('Error:', error);
        tbody.innerHTML = '<div class="error">Error loading leaderboard.</div>';
    });
}
<<<<<<< newbackground
 
// Call the function to update leaderboard when the page loads
=======

>>>>>>> pre-main
document.addEventListener('DOMContentLoaded', () => {
    updateLeaderboard();
});
