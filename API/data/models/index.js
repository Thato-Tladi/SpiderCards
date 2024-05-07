require('dotenv').config();
const { Sequelize } = require('sequelize');
const moment = require('moment');

//Overriding default date/time behaviour
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  };

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'mssql' });

const User = require('./User')(sequelize);
const CardType = require('./CardType')(sequelize);
const Card = require('./Card')(sequelize);
const GameSession = require('./GameSession')(sequelize);
const UserStats = require('./UserStats')(sequelize);

module.exports = { sequelize, User, CardType, Card, GameSession, UserStats};
