const { GameSession, UserStats } = require('../../data/models');
const { Op } = require('sequelize');
const { ROUND_TIMEOUT } = require('../config/gameSettings');

const terminateIdleSessions = async () => {
    const cutoffTime = new Date(Date.now() - ROUND_TIMEOUT * 1000);
  
    console.log(`Terminating sessions started before ${cutoffTime}`);
  
    const idleSessions = await GameSession.findAll({
      where: {
        end_time: null,
        start_time: {
          [Op.lt]: cutoffTime
        }
      },
      attributes: ['session_id', 'user_id', 'score']
    });
  
    console.log(`Found ${idleSessions.length} idle sessions to terminate.`);
  
    for (const session of idleSessions) {
      try {
        // Update the end_time for the session
        await GameSession.update(
          { end_time: new Date() },
          { where: { session_id: session.session_id } }
        );
  
        // Find or create the UserStats record and update it
        const [userStats, created] = await UserStats.findOrCreate({
          where: { user_id: session.user_id },
          defaults: {
            user_id: session.user_id,
            total_score: session.score,
            total_games_played: 1
          }
        });
  
        if (!created) {
          userStats.total_score += session.score;
          userStats.total_games_played += 1;
          await userStats.save();
        }
  
        console.log(`Session ${session.session_id} terminated due to inactivity.`);
      } catch (error) {
        console.error(`Error while terminating session ${session.session_id}:`, error);
      }
    }
  };

module.exports = {
  terminateIdleSessions
};
