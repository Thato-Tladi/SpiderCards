document.addEventListener('DOMContentLoaded', function() {
    // Retrieve references after DOM is fully loaded
    const profileIcon = document.querySelector('.profile-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const navigation = document.querySelector('.navigation');
 
    if (profileIcon) {
        profileIcon.addEventListener('click', function(event) {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
                navigation.classList.remove('dropdown-open'); // Remove the class
            } else {
                dropdownMenu.style.display = 'block';
                navigation.classList.add('dropdown-open'); // Add the class
            }
            event.stopPropagation(); // Prevent propagation to outer elements
        });
    }
 
    // Handle clicks outside the profile icon to close the dropdown
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.profile-icon') && dropdownMenu) {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
                navigation.classList.remove('dropdown-open'); // Remove the class
            }
        }
    });
 
    // Fetch user data for the statistics
    const getUserData = () => {
        const bearerToken = localStorage.getItem('access_token');
        fetch('http://spidercards-app.eu-west-1.elasticbeanstalk.com/api/user/stats', {
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
                // Extract user stats data
                const userStats = data.statistics || { user_stats_id: 0, user_id: 0, total_score: 0, total_games_played: 0 };
                const { user_id: userId, total_score: totalScore, total_games_played: totalGamesPlayed } = userStats;
 
                // Update user stats in the HTML
                document.getElementById('userId').textContent = userId;
                document.getElementById('totalScore').textContent = totalScore;
                document.getElementById('gamesPlayed').textContent = totalGamesPlayed;
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('userId').textContent = 'Error loading data'; // Display error message
            });
    };
 
    // Initialize user data after DOM is fully loaded
    getUserData();
});