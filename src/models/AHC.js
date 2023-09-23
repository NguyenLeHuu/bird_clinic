"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AHC extends Model {
    static associate(models) {}
  }
  AHC.init(
    {
      AHC_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      ISO_microchip: DataTypes.STRING,
      number_of_pet: DataTypes.STRING,
      breed: DataTypes.STRING,
      color: DataTypes.STRING,
      day_of_birth: DataTypes.STRING,
      vet_authorization: DataTypes.STRING,
      vaccine_name: DataTypes.STRING,
      vaccine_manufacturer: DataTypes.STRING,
      manufacture_date: DataTypes.STRING,
      expiration_date: DataTypes.STRING,
      booking_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AHC",
      timestamps: false,
    }
  );
  return AHC;
};
