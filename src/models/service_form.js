"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service_Form extends Model {
    static associate(models) {
      Service_Form.hasMany(models.service_form_detail, {
        foreignKey: "service_form_id",
      });
      Service_Form.hasMany(models.bill, {
        foreignKey: "service_form_id",
      });
      Service_Form.belongsTo(models.booking, {
        foreignKey: "booking_id",
      });
    }
  }
  Service_Form.init(
    {
      service_form_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      bird_id: DataTypes.STRING,
      booking_id: DataTypes.STRING,
      reason_referral: DataTypes.STRING,
      status: DataTypes.STRING,
      date: DataTypes.STRING,
      veterinarian_referral: DataTypes.STRING,
      total_price: DataTypes.STRING,
      qr_code: DataTypes.STRING,
      num_ser_must_do: DataTypes.STRING,
      num_ser_has_done: DataTypes.STRING,
      time_create: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "service_form",
      timestamps: false,
    }
  );
  return Service_Form;
};
