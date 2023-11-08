"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cage extends Model {
    static associate(models) {}
  }
  Cage.init(
    {
      cage_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      boarding_id: DataTypes.STRING,
      bird_id: DataTypes.STRING,
      status: DataTypes.STRING,
      size: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "cage",
      timestamps: false,
    }
  );
  return Cage;
};
