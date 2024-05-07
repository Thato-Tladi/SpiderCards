const { User } = require('../models');

const findUserIdBySub = async (user_sub) => {
  const user = await User.findOne({
    where: {
      auth0_id: user_sub
    }
  });
  return user ? user.user_id : null;
};

module.exports = {
  findUserIdBySub
};
