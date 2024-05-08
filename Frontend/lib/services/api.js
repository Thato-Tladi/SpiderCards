const BASE_URL = "http://spidercards-app.eu-west-1.elasticbeanstalk.com/api";

const authHeader = "Bearer "+ localStorage.getItem('access_token');

function makeHeaders(json = false) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", authHeader);
    if (json) {
        myHeaders.append("Content-Type", "application/json");
    }
    return myHeaders;
}

function auth() {
    const requestOptions = {
        method: 'POST',
        headers: makeHeaders(),
        redirect: 'follow'
    };

fetch(`${BASE_URL}/auth`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function startGame() {
    const requestOptions = {
        method: 'POST',
        headers: makeHeaders(),
        redirect: 'follow'
    };

    return fetch(`${BASE_URL}/game/session/start`, requestOptions)
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

    return fetch(`${BASE_URL}/game/session/${sessionId}/cards`, requestOptions)
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

    return fetch(`${BASE_URL}/game/session/${sessionId}/choose`, requestOptions)
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

export { startGame, getSessionCards, chooseCard, getSessionInfo, endSession, getLeaderboard, getUserStats, auth};
