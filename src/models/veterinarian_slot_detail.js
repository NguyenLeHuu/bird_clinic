"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VeterinarianSlotDetail extends Model {
    static associate(models) {}
  }
  VeterinarianSlotDetail.init(
    {
      veterinarian_slot_detail_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      time_slot_id: DataTypes.STRING,
      veterinarian_id: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "veterinarian_slot_details",
      timestamps: false,
    }
  );
  return VeterinarianSlotDetail;
};
