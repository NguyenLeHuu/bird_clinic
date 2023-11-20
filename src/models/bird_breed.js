"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BirdBreed extends Model {
    static associate(models) {
      BirdBreed.belongsTo(models.bird_size, {
        foreignKey: "bird_size_id",
      });
      // BirdBreed.hasMany(models.booking, {
      //   foreignKey: "bird_id",
      // });
    }
  }
  BirdBreed.init(
    {
      breed_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      bird_size_id: DataTypes.STRING,
      breed: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "bird_breed",
      timestamps: false,
    }
  );
  return BirdBreed;
};
