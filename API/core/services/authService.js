const authRepository = require('../../data/repositories/authRepository');

const checkOrCreateUser = async (auth0Id, email, username, updatedAt) => {
  let user = await authRepository.findUserByAuth0Id(auth0Id);

  if (!user) {
    user = await authRepository.createUser(auth0Id, email, username, updatedAt);
  }

  return user;
};

module.exports = { checkOrCreateUser };
