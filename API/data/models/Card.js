// data/models/Card.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Card = sequelize.define(
    'Card',
    {
      card_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      scientific_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      habitat: {
        type: DataTypes.STRING,
        allowNull: false
      },
      toxicity_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CardTypes',
          key: 'type_id'
        }
      }
    },
    {
      schema: 'SpiderCardsSchema',
      tableName: 'Cards',
      timestamps: false
    }
  );

  return Card;
};
