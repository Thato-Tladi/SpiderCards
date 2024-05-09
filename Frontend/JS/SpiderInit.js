import { startGame } from "../services/api.js";

document.addEventListener('DOMContentLoaded', function() {

  function checkAuth() {
    const accessToken = localStorage.getItem('access_token');
    return accessToken !== null;
}

  function updateButton() {
    const isAuthenticated = checkAuth();

    if(isAuthenticated){
      const button = document.getElementById('startGame');
      button.addEventListener('click', startGame);
    } else {
      //logic for prompting login='Play.html'
    }
  
}
});