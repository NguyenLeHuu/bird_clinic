"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BirdSize extends Model {
    static associate(models) {}
  }
  BirdSize.init(
    {
      bird_size_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      size: DataTypes.STRING,
      breed: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BirdSize",
      timestamps: false,
    }
  );
  return BirdSize;
};
