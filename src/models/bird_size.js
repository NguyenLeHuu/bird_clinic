"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BirdSize extends Model {
    static associate(models) {
      BirdSize.hasMany(models.bird_breed, {
        foreignKey: "bird_size_id",
      });
    }
  }
  BirdSize.init(
    {
      bird_size_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      size: DataTypes.STRING,
      breeds: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "bird_size",
      timestamps: false,
    }
  );
  return BirdSize;
};
