import { auth, gameInit} from "./api.js";
document.addEventListener('DOMContentLoaded', function() {
    const config = {
        domain: "dev-rl7aax8fm51txbjk.us.auth0.com",
        client_id: "Pftm1IeOZCzd0miQXZdlZM8tFu8uBBOB",
        redirect_uri: "http://spidercards-frontend-20240508.s3-website-eu-west-1.amazonaws.com",
        audience: "https://spider-cards.co.za",
        scope: "openid profile email",
        nonce: "some_nonce"
    };

  function checkAuth() {
      const accessToken = localStorage.getItem('access_token');
      return accessToken !== null;
  }

  function updateButton() {
      const isAuthenticated = checkAuth();
      const button = document.getElementById('actionButton');
      if (isAuthenticated) {
          button.textContent = 'Start Game';
          button.removeEventListener('click', login);
          button.addEventListener('click', startGame);
      } else {
          button.textContent = 'Login';
          button.removeEventListener('click', startGame);
          button.addEventListener('click', login);
      }
  }

  function login() {
    const params = new URLSearchParams({
        client_id: config.client_id,
        protocol: "oauth2",
        audience: config.audience,
        response_type: "token id_token",
        redirect_uri: config.redirect_uri,
        scope: config.scope,
        nonce: config.nonce
    });
      window.location.href = `https://${config.domain}/authorize?${params.toString()}`;
  }

async function startGame() {
    console.log('Starting the game!');
    try {
        await auth();
        await gameInit();
        window.location.href = 'Play.html';
    } catch (error) {
        console.error('Error during game start:', error);
        alert("Failed to start the game. Please try again.");
    }
}

async function handleAuthentication() {
    const urlParams = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = urlParams.get('access_token');
    if (accessToken) {
        localStorage.setItem('access_token', accessToken);
        window.location.hash = '';
        if (!window.location.search.includes('reloaded')) {
            window.location.search += 'reloaded=true';
            window.location.reload();
        } else {
            const authResponse = await auth();
            if (authResponse.status.ok) {
                const dataResponse = await authResponse.json()
                sessionStorage.setItem("username", dataResponse.user.username);
            }
            updateButton();
        }
    } else {
        updateButton();
    }
}


  handleAuthentication();
});

