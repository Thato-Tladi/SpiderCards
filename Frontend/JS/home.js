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

        // Populate leaderboard table
        if (data.leaderboard == null) {
            let row = tbody.insertRow();
            let nameCell = row.insertCell(0);
            let scoreCell = row.insertCell(1);
            nameCell.textContent = '0';
            scoreCell.textContent = '0';
        } else {
            data.leaderboard.forEach(player => {
                let row = tbody.insertRow();
                let userIdCell = row.insertCell(0); // Change variable name to userIdCell
                let scoreCell = row.insertCell(1);
                userIdCell.textContent = player.user_id; // Change to user_id
                scoreCell.textContent = player.total_score; // Keep total_score
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// Call the function to update leaderboard when the page loads
updateLeaderboard();

