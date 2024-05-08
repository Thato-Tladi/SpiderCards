const express = require('express');
const { checkJwt } = require('../middleware/authMiddleware');
const { checkOrCreateUser } = require('../controllers/authController');

const router = express.Router();

router.post('/auth', checkJwt, checkOrCreateUser);

module.exports = router;
