// data/models/GameSession.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GameSession = sequelize.define(
    'GameSession',
    {
      session_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      current_round: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      schema: 'SpiderCardsSchema',
      tableName: 'GameSessions',
      timestamps: false
    }
  );

  return GameSession;
};
