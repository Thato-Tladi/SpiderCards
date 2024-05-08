const gameRepository = require('../../data/repositories/gameRepository');

const validateActiveSession = async (sessionId) => {
  const session = await gameRepository.findGameSessionById(sessionId);

  if (!session) {
    throw new Error('Game session not found');
  }

  if (session.end_time) {
    throw new Error('The game session is already over.');
  }

  return session;
};

module.exports = {
  validateActiveSession
};
