const gameRepository = require('../../data/repositories/gameRepository');
const userRepository = require('../../data/repositories/userRepository');
const { Card } = require('../../data/models');
const { validateActiveSession } = require('../validators/sessionValidator');
const {MAX_ROUNDS} = require('../config/gameSettings');

const startGameSession = async (auth0_sub) => {
    const user_id = await userRepository.findUserIdBySub(auth0_sub);

    if (!user_id) {
      throw new Error(`User with Auth0 sub ${auth0_sub} not found`);
    }

    const session = await gameRepository.startGameSession(user_id);

    return {
      session
    };
  };

  const getNextCardPair = async (sessionId) => {
  const session = await validateActiveSession(sessionId);

  if (session.current_round == MAX_ROUNDS) {
    session.end_time = new Date();
    await gameRepository.updateGameSession(sessionId, { end_time: session.end_time });
    await gameRepository.recordUserGameHistory(session.user_id, session.score);
    throw new Error('The game session is over.');
  }

  const cards = await gameRepository.getRandomCards();

  const currentRound = session.current_round + 1;

  await gameRepository.updateGameSession(sessionId, { current_round: currentRound });

  return { cards, current_round: currentRound };
};

const submitCardChoice = async (sessionId, chosenCardId, isTimeout = false) => {
    const session = await validateActiveSession(sessionId);
  
    let scoreChange = 0;
    const card = await Card.findByPk(chosenCardId);
    const correctChoice = card && card.type_id === 2;
  
    if (isTimeout) {
      scoreChange = -100;
    } else if (correctChoice) {
      scoreChange = 100;
    } else {
      scoreChange = -100;
    }

    const newScore = session.score + scoreChange;
    const newRound = session.current_round + 1;
    const finalRound = newRound > MAX_ROUNDS;

    if (finalRound) {
      session.end_time = new Date();
      await gameRepository.recordUserGameHistory(session.user_id, newScore);
    }

    await gameRepository.updateGameSession(sessionId, {
        score: newScore,
        current_round: newRound-1,
         end_time: finalRound ? session.end_time : null
        });

    return {
      correct: !isTimeout && correctChoice,
      scoreChange,
      finalRound,
      card
    };
  };

  const endGameSession = async (sessionId, score) => {
    const session = await validateActiveSession(sessionId);
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


const getSessionInfo = async (sessionId) => {
    const session = await gameRepository.findGameSessionById(sessionId);
    if (!session) {
      throw new Error('Session does not exist');
    }
    return session;
  };

module.exports = {
  startGameSession,
  getNextCardPair,
  submitCardChoice,
  endGameSession,
  getLeaderboard,
  getUserStatistics,
  getSessionInfo
};
