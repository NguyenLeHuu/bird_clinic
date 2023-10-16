"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service_Form extends Model {
    static associate(models) {}
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
      is_paid: DataTypes.STRING,
      qr_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "service_form",
      timestamps: false,
    }
  );
  return Service_Form;
};
