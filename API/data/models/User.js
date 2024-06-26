const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      auth0_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('GETDATE()'),
      },
    },
    {
      schema: 'SpiderCardsSchema',
      tableName: 'Users',
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.hasOne(models.UserStats, {
      foreignKey: 'user_id',
    });
  };

  return User;
};
