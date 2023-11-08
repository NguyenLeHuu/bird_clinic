"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate(models) {}
  }
  Bill.init(
    {
      bill_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      total_price: DataTypes.STRING,
      service_form_id: DataTypes.STRING,
      booking_id: DataTypes.STRING,
      payment_method: DataTypes.STRING,
      transaction_id: DataTypes.STRING,
      status: DataTypes.STRING,
      time_create: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "bills",
      timestamps: false,
    }
  );
  return Bill;
};
