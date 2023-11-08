"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SlotClinic extends Model {
    static associate(models) {
      SlotClinic.hasMany(models.time_slot_clinic, {
        foreignKey: "slot_clinic_id",
      });
    }
  }
  SlotClinic.init(
    {
      slot_clinic_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "slot_clinics",
      timestamps: false,
    }
  );
  return SlotClinic;
};
