const { Card, GameSession, UserStats } = require('../models');
const { Op, sequelize } = require('sequelize');

const startGameSession = async (user_id) => {
  return await GameSession.create({
    user_id,
    start_time: new Date(),
    score: 0,
    current_round: 1
  });
};

const findGameSessionById = async (sessionId) => {
  return await GameSession.findOne({ where: { session_id: sessionId } });
};

const updateGameSession = async (sessionId, updates) => {
  return await GameSession.update(updates, { where: { session_id: sessionId } });
};

const getRandomCards = async (count, typeId) => {
  return await Card.findAll({
    where: {
      type_id: typeId
    },
   // order: sequelize.random(),
    limit: count
  });
};

const recordUserGameHistory = async (userId, score) => {
  const history = await UserStats.findOne({ where: { user_id: userId } });

  if (history) {
    await history.increment({ total_score: score, total_games_played: 1 });
  } else {
    await UserStats.create({ user_id: userId, total_score: score, total_games_played: 1 });
  }
};

const getLeaderboard = async (limit = 10) => {
  return await GameSession.findAll({
    order: [['score', 'DESC']],
    limit
  });
};

const getUserStatistics = async (userId) => {
  return await UserStats.findOne({ where: { user_id: userId } });
};

module.exports = {
  startGameSession,
  findGameSessionById,
  updateGameSession,
  getRandomCards,
  recordUserGameHistory,
  getLeaderboard,
  getUserStatistics
};
