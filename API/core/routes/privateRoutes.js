const express = require('express');
const { checkJwt } = require('../middleware/authMiddleware');
const router = express.Router();

// Private route
router.get('/api/private', checkJwt, (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

module.exports = router;
