"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    static associate(models) {
      Prescription.hasMany(models.prescription_detail, {
        foreignKey: "prescription_id",
      });
    }
  }
  Prescription.init(
    {
      prescription_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      booking_id: DataTypes.STRING,
      time_created: DataTypes.STRING,
      note: DataTypes.STRING,
      usage: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "prescription",
      timestamps: false,
    }
  );
  return Prescription;
};
