"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SlotClinic extends Model {
    static associate(models) {}
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
      modelName: "SlotClinic",
      timestamps: false,
    }
  );
  return SlotClinic;
};
