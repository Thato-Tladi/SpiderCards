const { User } = require('../models');

const findUserByAuth0Id = async (auth0Id) => {
  return await User.findOne({ where: { auth0_id: auth0Id } });
};

const createUser = async (auth0Id, email, username, updatedAt) => {
  return await User.create({
    auth0_id: auth0Id,
    email,
    username
  });
};

module.exports = { findUserByAuth0Id, createUser };
