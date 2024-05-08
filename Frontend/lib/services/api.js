const BASE_URL = "http://localhost:3000/api/game";

const authHeader = "Bearer "+ localStorage.getItem('access_token');

function makeHeaders(json = false) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", authHeader);
    if (json) {
        myHeaders.append("Content-Type", "application/json");
    }
    return myHeaders;
}

function startGame() {
    const requestOptions = {
        method: 'POST',
        headers: makeHeaders(),
        redirect: 'follow'
    };

    return fetch(`${BASE_URL}/session/start`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error('Error:', error));
}

function getSessionCards(sessionId) {
    const requestOptions = {
        method: 'GET',
        headers: makeHeaders(),
        redirect: 'follow'
    };

    return fetch(`${BASE_URL}/session/${sessionId}/cards`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error('Error:', error));
}

function chooseCard(sessionId, cardId) {
    const raw = JSON.stringify({ cardId });

    const requestOptions = {
        method: 'POST',
        headers: makeHeaders(true),
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${BASE_URL}/session/${sessionId}/choose`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error('Error:', error));
}

function getSessionInfo(sessionId) {
    const requestOptions = {
        method: 'GET',
        headers: makeHeaders(),
        redirect: 'follow'
    };

    return fetch(`${BASE_URL}/session/${sessionId}/info`, requestOptions)
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

    return fetch(`${BASE_URL}/session/${sessionId}/end`, requestOptions)
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

    return fetch(`${BASE_URL}/leaderboard`, requestOptions)
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

export { startGame, getSessionCards, chooseCard, getSessionInfo, endSession, getLeaderboard, getUserStats };
