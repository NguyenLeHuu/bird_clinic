"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    static associate(models) {}
  }
  Medicine.init(
    {
      medicine_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      unit: DataTypes.STRING,
      usage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Medicine",
      timestamps: false,
    }
  );
  return Medicine;
};
