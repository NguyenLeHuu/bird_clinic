"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MedicalRecord extends Model {
    static associate(models) {}
  }
  MedicalRecord.init(
    {
      medical_record_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      symptom: DataTypes.STRING,
      diagnose: DataTypes.STRING,
      recommendations: DataTypes.STRING,
      service_form_detail_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "medical_records",
      timestamps: false,
    }
  );
  return MedicalRecord;
};
