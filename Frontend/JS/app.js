let auth0 = null;

const configureClient = async () => {
    auth0 = await createAuth0Client({
        domain: 'dev-yr27mck7ia3usnqt.us.auth0.com', // Replace with your Auth0 domain
        client_id: 'J9n24pKYHIOCyFMEXJnUY1RjvmrnfC6b', // Replace with your Auth0 client ID
        redirect_uri: window.location.origin
    });
};

window.onload = async () => {
    await configureClient();
    updateUI();

    const isAuthenticated = await auth0.isAuthenticated();
    
    if (isAuthenticated) {
        // show the gated content
        console.log('User is authenticated');
    } else {
        // show the login page
        console.log('User not authenticated');
    }

    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        // Process the login state
        await auth0.handleRedirectCallback();
        
        updateUI();
        // Use replaceState to remove code and state from URL
        window.history.replaceState({}, document.title, "/");
    }
};

const login = async () => {
    await auth0.loginWithRedirect({
        redirect_uri: window.location.origin
    });
};

document.getElementById('login').addEventListener('click', login);

const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        console.log('User is authenticated, show the gated content.');
    } else {
        console.log('User is not authenticated, show the login button.');
    }
};
