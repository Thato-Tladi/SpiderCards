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
        const bearerToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZwVFN5X3gtUGpzTUNkbm1UalNZVSJ9.eyJodHRwczovL2RvZ3plbi5jb20vY2xhaW1zL2VtYWlsIjoidTIxNDk5NzQ5QHR1a3MuY28uemEiLCJpc3MiOiJodHRwczovL2Rldi1ybDdhYXg4Zm01MXR4YmprLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMzk0MDkyNTAyNDE1MjQwODExNSIsImF1ZCI6WyJodHRwczovL3NwaWRlci1jYXJkcy5jby56YSIsImh0dHBzOi8vZGV2LXJsN2FheDhmbTUxdHhiamsudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcxNTI0NjgxMywiZXhwIjoxNzE1MjU0MDEzLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiUGZ0bTFJZU9aQ3pkMG1pUVhaZGxaTTh0RnU4dUJCT0IifQ.EpaGcEPtvBqfYPOuQIHrvwQZ2TV6IupIdfYMHICixqlzkqpW74BrvzxZzCMJvunknZ1JI0iZYU0382gQVM5qHWon4DnZ8OfXoXz9EJOLm_9w_AW8aDeFWAoKm8-dBnhiKweB1oRB1VrtOTqrD4wWOeuPwio9bPQ_-yBwFzmc-l08vmIDN8WoyeVW3ZEYsaB8ifhks6rIMmKcIg4Uc2r7x8h6JNPTKvCzOWvLJKr5o4-ta3IbvBMHX3D-P_ADRekPuKbMLxjfgTyrkOoqWt3ZRkGd-ZNgN_gmMV5GRrAGPDRiPdzJiUAAqXsKiSEpL-05oNRkBnUU02fQyCincbCttg'; // Replace with actual token
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