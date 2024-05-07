// services/gameService.js
const { Op } = require('sequelize');
const gameRepository = require('../../data/repositories/gameRepository');
const userRepository = require('../../data/repositories/userRepository');
const { Card } = require('../../data/models');

const startGameSession = async (auth0_sub) => {
    // Retrieve user ID based on Auth0 sub
    const user_id = await userRepository.findUserIdBySub(auth0_sub);

    if (!user_id) {
      throw new Error(`User with Auth0 sub ${auth0_sub} not found`);
    }

    // Start the game session using the user ID
    const session = await gameRepository.startGameSession(user_id);

    // Retrieve venomous and non-venomous cards
    const venomousCards = await gameRepository.getRandomCards(10, 1);
    const nonVenomousCards = await gameRepository.getRandomCards(10, 2);

    return {
      session,
      cards: [
        ...venomousCards.map(card => ({ ...card.dataValues, is_venomous: true })),
        ...nonVenomousCards.map(card => ({ ...card.dataValues, is_venomous: false }))
      ]
    };
  };

const getNextCardPair = async (sessionId) => {
  const session = await gameRepository.findGameSessionById(sessionId);

  if (!session) {
    throw new Error('Game session not found');
  }

  const cards = await gameRepository.getRandomCards(2, { [Op.or]: [1, 2] });

  return { cards, current_round: session.current_round + 1 };
};

const submitCardChoice = async (sessionId, chosenCardId, isTimeout = false) => {
  const session = await gameRepository.findGameSessionById(sessionId);

  if (!session) {
    throw new Error('Game session not found');
  }

  let scoreChange = 0;
  const card = await Card.findByPk(chosenCardId);
  const correctChoice = card && card.type_id === 2; // Assuming type_id 2 is non-venomous

  if (isTimeout) {
    scoreChange = -100; // Auto-lose points if timed out
  } else if (correctChoice) {
    scoreChange = 100;
  } else {
    scoreChange = -100;
  }

  session.score += scoreChange;
  session.current_round += 1;

  if (session.current_round >= 10) { // Assuming the game ends after 10 rounds
    session.end_time = new Date();
    await gameRepository.recordUserGameHistory(session.user_id, session.score);
  }

  await gameRepository.updateGameSession(sessionId, { score: session.score, current_round: session.current_round });

  return {
    correct: !isTimeout && correctChoice,
    scoreChange,
    finalRound: session.current_round >= 10,
    card
  };
};

const endGameSession = async (sessionId, score) => {
  const session = await gameRepository.findGameSessionById(sessionId);

  if (!session) {
    throw new Error('Game session not found');
  }

  await gameRepository.updateGameSession(sessionId, { end_time: new Date(), score });
  await gameRepository.recordUserGameHistory(session.user_id, score);

  return { success: true };
};

const getLeaderboard = async (limit) => {
  return await gameRepository.getLeaderboard(limit);
};

const getUserStatistics = async (user_sub) => {
    const userId = await userRepository.findUserIdBySub(user_sub);
    return await gameRepository.getUserStatistics(userId);
};

module.exports = {
  startGameSession,
  getNextCardPair,
  submitCardChoice,
  endGameSession,
  getLeaderboard,
  getUserStatistics
};
