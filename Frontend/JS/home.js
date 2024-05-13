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
        // Clear current entries
        tbody.innerHTML = '';

        // Sort leaderboard data in descending order
        const sortedLeaderboard = data.leaderboard.sort((a, b) => b.total_score - a.total_score);
 
        // Populate leaderboard table with top 5 scores
        const top5 = sortedLeaderboard.slice(0, 5);
        top5.forEach(player => {
            let row = tbody.insertRow();
            let userIdCell = row.insertCell(0);
            let scoreCell = row.insertCell(1);
            userIdCell.textContent = player.user_id;
            scoreCell.textContent = player.total_score;
        });
    })
    .catch(error => {
        // Display error message
        console.error('Error:', error);
    });
}
 
// Call the function to update leaderboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateLeaderboard();
});
