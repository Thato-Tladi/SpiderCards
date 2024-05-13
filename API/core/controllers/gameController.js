const gameService = require('../services/gameService');

const startGameSession = async (req, res) => {
  try {
    const user_sub = req.auth.payload.sub;
    const { session, cards } = await gameService.startGameSession(user_sub);

    res.json({ sessionId: session.session_id, cards });
  } catch (error) {
    console.error('Error in startGameSession:', error);
    res.status(500).json({ message: 'Failed to start game session', error: error.message });
  }
};

const getNextCardPair = async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const { cards, current_round } = await gameService.getNextCardPair(sessionId);
      res.json({ cards, current_round, time_limit: 10 });
    } catch (error) {
      console.error('Error in getNextCardPair:', error);
      res.status(500).json({ message: error.message || 'Failed to retrieve next card pair' });
    }
  };

const submitCardChoice = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const { cardId, isTimeout = false } = req.body;
    const result = await gameService.submitCardChoice(sessionId, cardId, isTimeout);

    res.json(result);
  } catch (error) {
    console.error('Error in submitCardChoice:', error);
    res.status(500).json({ message: 'Failed to submit card choice', error: error.message });
  }
};

const endGameSession = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const result = await gameService.endGameSession(sessionId);

    res.json(result);
  } catch (error) {
    console.error('Error in endGameSession:', error);
    res.status(500).json({ message: 'Failed to end game session', error: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const limit = 5;//req.query.limit || 10;
    const leaderboard = await gameService.getLeaderboard(parseInt(limit, 5));

    res.json({ leaderboard });
  } catch (error) {
    console.error('Error in getLeaderboard:', error);
    res.status(500).json({ message: 'Failed to retrieve leaderboard', error: error.message });
  }
};


  const getSessionInfo = async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const session = await gameService.getSessionInfo(sessionId);

      res.json(session);
    } catch (error) {
      console.error('Error in getSessionInfo:', error);
      res.status(500).json({ message: 'Failed to retrieve session info', error: error.message });
    }
  };

  module.exports = {
    startGameSession,
    getNextCardPair,
    submitCardChoice,
    endGameSession,
    getLeaderboard,
    getSessionInfo
  };
