const userRepository = require('../../data/repositories/userRepository');

const getUserStatistics = async (user_sub) => {
    const userId = await userRepository.findUserIdBySub(user_sub);
    return await userRepository.getUserStatistics(userId);
};

module.exports = {
    getUserStatistics
};