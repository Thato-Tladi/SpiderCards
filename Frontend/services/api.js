const BASE_URL = "http://spidercards-app.eu-west-1.elasticbeanstalk.com/api";

const authHeader = "Bearer "+ localStorage.getItem('access_token');

async function auth() {
    const response = await fetch(`${BASE_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authHeader
        },
      });
      return response;
    }

 async function gameInit() {
    try {
        const response = await fetch(`${BASE_URL}/game/start`, {
            method: "POST",
            headers: {
                "Authorization": authHeader
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        console.log("Server response:", data);

        // Assuming the response JSON object contains a 'sessionId' key
        const sessionId = data.sessionId;
        console.log("Session ID:", sessionId);

        // Store the sessionId in sessionStorage
        sessionStorage.setItem('sessionId', sessionId);
    } catch (error) {
        console.error('Error:', error);
    }
    }


async function getSessionCards() {
    try {
        const response = await fetch(`${BASE_URL}/game/session/${sessionStorage.getItem('sessionId')}/cards`, {
            method: 'GET',
            headers: {
                "Authorization": authHeader
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        console.log("Server response:", data);
    
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}


async function chooseCard(cardId) {
    
    try {
        const raw = JSON.stringify({ cardId });
        const response = await fetch(`${BASE_URL}/game/session/${sessionStorage.getItem('sessionId')}/choose`, {
            method: "POST",
            body: raw,
            headers: {
                "Authorization": authHeader
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        console.log("Server response:", data);

        // Assuming the response JSON object contains a 'sessionId' key
        const sessionId = data.sessionId;
        console.log("Session ID:", sessionId);

        // Store the sessionId in sessionStorage
        sessionStorage.setItem('sessionId', sessionId);
    } catch (error) {
        console.error('Error:', error);
    }
    }

function getSessionInfo(sessionId) {
    const requestOptions = {
        method: 'GET',
        headers: makeHeaders(),
        redirect: 'follow'
    };

    return fetch(`${BASE_URL}/game/session/${sessionId}/info`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error('Error:', error));
}

function endSession(sessionId) {
    const requestOptions = {
        method: 'POST',
        headers: makeHeaders(),
        redirect: 'follow'
    };

    return fetch(`${BASE_URL}/game/session/${sessionId}/end`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error('Error:', error));
}

function getLeaderboard() {
    const requestOptions = {
        method: 'GET',
        headers: makeHeaders(),
        redirect: 'follow'
    };

    return fetch(`${BASE_URL}/game/leaderboard`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error('Error:', error));
}

function getUserStats() {
    const requestOptions = {
        method: 'GET',
        headers: makeHeaders(),
        redirect: 'follow'
    };

    return fetch(`${BASE_URL}/user/stats`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error('Error:', error));
}

export { gameInit, getSessionCards, chooseCard, getSessionInfo, endSession, getLeaderboard, getUserStats, auth};
