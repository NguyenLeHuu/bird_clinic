"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bird extends Model {
    static associate(models) {
      Bird.belongsTo(models.customer, {
        foreignKey: "customer_id",
      });
      Bird.hasMany(models.booking, {
        foreignKey: "bird_id",
      });
    }
  }
  Bird.init(
    {
      bird_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      customer_id: DataTypes.STRING,
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      hatching_date: DataTypes.STRING,
      ISO_microchip: DataTypes.STRING,
      weight: DataTypes.STRING,
      color: DataTypes.STRING,
      breed: DataTypes.STRING,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
      size: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "bird",
      timestamps: false,
    }
  );
  return Bird;
};
