"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TimeSlotClinic extends Model {
    static associate(models) {}
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
      modelName: "TimeSlotClinic",
      timestamps: false,
    }
  );
  return TimeSlotClinic;
};
