const express = require('express');
const { checkJwt } = require('../middleware/authMiddleware');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.post('/start', checkJwt, gameController.startGameSession);
router.get('/session/:sessionId/cards', checkJwt, gameController.getNextCardPair);
router.post('/session/:sessionId/choose', checkJwt, gameController.submitCardChoice);
router.post('/session/:sessionId/end', checkJwt, gameController.endGameSession);
router.get('/leaderboard', gameController.getLeaderboard);
router.get('/session/:sessionId/info', checkJwt, gameController.getSessionInfo);

module.exports = router;
