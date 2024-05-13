document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.querySelector('.profile-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const navigation = document.querySelector('.navigation');

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        if (profileIcon) {
            profileIcon.style.display = 'none';
        }
        if (dropdownMenu) {
            dropdownMenu.style.display = 'none';
        }
        return;
    }

    if (profileIcon) {
        profileIcon.addEventListener('click', function(event) {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
                navigation.classList.remove('dropdown-open');
            } else {
                dropdownMenu.style.display = 'block';
                navigation.classList.add('dropdown-open');
            }
            event.stopPropagation();
        });
    }

    document.addEventListener('click', function(event) {
        if (!event.target.matches('.profile-icon') && dropdownMenu) {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
                navigation.classList.remove('dropdown-open');
            }
        }
    });

    const getUserData = () => {
        const bearerToken = localStorage.getItem('access_token');
        fetch('http://spidercards-app.eu-west-1.elasticbeanstalk.com/api/user/stats', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
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
            const userStats = data.statistics || { user_stats_id: 0, username: '', user_id: 0, total_score: 0, total_games_played: 0 };
            console.log(userStats)
            const {total_score: totalScore, total_games_played: totalGamesPlayed } = userStats;

            document.getElementById('totalScore').textContent = totalScore;
            document.getElementById('gamesPlayed').textContent = totalGamesPlayed;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('userId').textContent = 'Error loading data';
        });
    };

    getUserData();
});
