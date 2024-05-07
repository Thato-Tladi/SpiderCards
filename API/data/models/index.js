require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'mssql' });

const User = require('./User')(sequelize);
const CardType = require('./CardType')(sequelize);
const Card = require('./Card')(sequelize);

module.exports = { sequelize, User, CardType, Card};
