const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    'CardType',
    {
      type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Venomous', 'Non_Venomous']]
        }
      }
    },
    {
      schema: 'SpiderCardsSchema',
      tableName: 'CardTypes',
      timestamps: false
    }
  );
};
