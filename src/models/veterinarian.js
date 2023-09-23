"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Veterinarian extends Model {
    static associate(models) {}
  }
  Veterinarian.init(
    {
      veterinarian_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      account_id: DataTypes.STRING,
      service_type_id: DataTypes.STRING,
      specialized: DataTypes.STRING,
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Veterinarian",
      timestamps: false,
    }
  );
  return Veterinarian;
};
