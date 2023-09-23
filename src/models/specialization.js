"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialization extends Model {
    static associate(models) {}
  }
  Specialization.init(
    {
      specialization_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      veterinarian_id: DataTypes.STRING,
      service_id: DataTypes.STRING,
      veterinarian_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Specialization",
      timestamps: false,
    }
  );
  return Specialization;
};
