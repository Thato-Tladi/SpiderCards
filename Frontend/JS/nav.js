document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.querySelector('.profile-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const navigation = document.querySelector('.navigation');

    profileIcon.addEventListener('click', function(event) {
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
            navigation.classList.remove('dropdown-open'); // Remove the class
        } else {
            dropdownMenu.style.display = 'block';
            navigation.classList.add('dropdown-open'); // Add the class
        }
        event.stopPropagation();
    });

    document.addEventListener('click', function(event) {
        if (!event.target.matches('.profile-icon')) {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
                navigation.classList.remove('dropdown-open'); // Remove the class
            }
        }
    });

    document.getElementById('logoutButton').addEventListener('click', function() {
        console.log('Logging out...');
        // Here you would usually trigger the logout logic
    });
});

function getUserData() {
    // Call your backend API to get user data
    // For example, using Fetch API or Axios
    fetch('/api/user', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken // Assuming you have an access token from Auth0
        }
    })
    .then(response => response.json())
    .then(data => {
        // Populate the user ID in the dropdown
        document.getElementById('userId').textContent = data.userId;
        // You can populate other data here as well
    })
    .catch(error => console.error('Error:', error));
}

// Call the function to populate user data when the page loads
document.addEventListener('DOMContentLoaded', getUserData);
