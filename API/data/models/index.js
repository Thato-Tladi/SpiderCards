require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'mssql' });

const User = require('./User')(sequelize);

module.exports = { sequelize, User};
