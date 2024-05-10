const { DataTypes } = require('sequelize');
 
module.exports = (sequelize) => {
  const UserStats = sequelize.define(
    'UserStats',
    {
      user_stats_id: {
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
      total_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total_games_played: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      schema: 'SpiderCardsSchema',
      tableName: 'UserStats',
      timestamps: false
    }
  );
 
  UserStats.associate = (models) => {
    UserStats.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
 
 
  return UserStats;
};