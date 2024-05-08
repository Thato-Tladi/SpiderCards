require('dotenv').config();
const authService = require('../services/authService');

const checkOrCreateUser = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];

    console.log(`${process.env.ISSUER}/userinfo`)
    const response = await fetch(`${process.env.ISSUER}userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }

    const { sub, email, nickname, updated_at } = await response.json();

    const user = await authService.checkOrCreateUser(sub, email, nickname, updated_at);

    res.json({ message: 'User authenticated', user });
  } catch (error) {
    console.error('Error in checkOrCreateUser:', error);
    res.status(500).json({ message: 'Failed to authenticate user', error: error.message });
  }
};

module.exports = { checkOrCreateUser };
