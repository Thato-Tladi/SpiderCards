document.addEventListener('DOMContentLoaded', function() {
  const config = {
      domain: "your-domain.auth0.com",
      client_id: "your-client-id",
      redirect_uri: "http://your-redirect-uri",
      audience: "your-audience",
      scope: "openid profile email",
      nonce: "unique-nonce"
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
          response_type: 'token',
          redirect_uri: config.redirect_uri,
          scope: config.scope,
          nonce: config.nonce
      });
      window.location.href = `https://${config.domain}/authorize?${params.toString()}`;
  }

  function startGame() {
      console.log('Starting the game!');
      // Game starting logic goes here
  }

  function handleAuthentication() {
      const urlParams = new URLSearchParams(window.location.hash.substr(1));
      const accessToken = urlParams.get('access_token');
      if (accessToken) {
          localStorage.setItem('access_token', accessToken);
          window.location.hash = '';  // Clear URL after storing the token
      }
      updateButton();
  }

  handleAuthentication();
});

