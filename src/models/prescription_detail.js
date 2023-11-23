"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PrescriptionDetail extends Model {
    static associate(models) {
      PrescriptionDetail.belongsTo(models.prescription, {
        foreignKey: "prescription_id",
      });
      PrescriptionDetail.belongsTo(models.medicine, {
        foreignKey: "medicine_id",
      });
    }
  }
  PrescriptionDetail.init(
    {
      prescription_detail_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      prescription_id: DataTypes.STRING,
      medicine_id: DataTypes.STRING,
      usage: DataTypes.STRING,
      total_dose: DataTypes.STRING,
      dose: DataTypes.STRING,
      day: DataTypes.STRING,
      status: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "prescription_detail",
      timestamps: false,
    }
  );
  return PrescriptionDetail;
};
