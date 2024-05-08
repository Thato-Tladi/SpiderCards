const { User, UserStats } = require('../models');

const findUserIdBySub = async (user_sub) => {
  const user = await User.findOne({
    where: {
      auth0_id: user_sub
    }
  });
  return user ? user.user_id : null;
};


const getUserStatistics = async (userId) => {
    return await UserStats.findOne({ where: { user_id: userId } });
  };

module.exports = {
  findUserIdBySub,
  getUserStatistics
};
