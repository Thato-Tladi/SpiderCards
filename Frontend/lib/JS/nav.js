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
