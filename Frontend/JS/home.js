function updateLeaderboard() {
    const tbody = document.querySelector('#leaderboard tbody');
    tbody.innerHTML = ''; // Clear current entries

    const players = [
        { name: "Player1", score: 250 },
        { name: "Player2", score: 200 }
    ];

    players.forEach(player => {
        let row = tbody.insertRow();
        let nameCell = row.insertCell(0);
        let scoreCell = row.insertCell(1);
        nameCell.textContent = player.name;
        scoreCell.textContent = player.score;
    });
}

updateLeaderboard();
