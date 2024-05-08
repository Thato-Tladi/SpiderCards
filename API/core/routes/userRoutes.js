const express = require('express');
const { checkJwt } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();


router.get('/stats', checkJwt, userController.getUserStatistics);

module.exports = router;