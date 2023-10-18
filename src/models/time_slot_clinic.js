"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TimeSlotClinic extends Model {
    static associate(models) {
      TimeSlotClinic.hasMany(models.veterinarian_slot_details, {
        foreignKey: "time_slot_id",
      });
      TimeSlotClinic.belongsTo(models.slot_clinics, {
        foreignKey: "slot_clinic_id",
      });
    }
  }
  TimeSlotClinic.init(
    {
      time_slot_clinic_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      slot_id: DataTypes.STRING,
      date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "time_slot_clinic",
      timestamps: false,
    }
  );
  return TimeSlotClinic;
};
