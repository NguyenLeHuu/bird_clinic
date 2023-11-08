"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VeterinarianSlotDetail extends Model {
    static associate(models) {
      VeterinarianSlotDetail.belongsTo(models.time_slot_clinics, {
        foreignKey: "time_slot_clinic_id",
      });
      VeterinarianSlotDetail.belongsTo(models.veterinarians, {
        foreignKey: "veterinarian_id",
      });
    }
  }
  VeterinarianSlotDetail.init(
    {
      veterinarian_slot_detail_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      time_slot_clinic_id: DataTypes.STRING,
      veterinarian_id: DataTypes.STRING,
      status: DataTypes.STRING,
      date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "veterinarian_slot_details",
      timestamps: false,
    }
  );
  return VeterinarianSlotDetail;
};
