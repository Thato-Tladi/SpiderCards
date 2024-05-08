const userService = require('../services/userService');
const { decodeJWT } = require('../utils/jwtUtils')

const getUserStatistics = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No or invalid Authorization header' });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = decodeJWT(token);
        const user_sub = decodedToken.sub;

        const statistics = await userService.getUserStatistics(user_sub);
        res.json({ statistics });
        } catch (error) {
        console.error('Error in getUserStatistics:', error);
        res.status(500).json({ message: 'Failed to retrieve user statistics', error: error.message });
        }
  };

  module.exports = {
    getUserStatistics
  };