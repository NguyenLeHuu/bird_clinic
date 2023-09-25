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
      paypal_transaction_id: DataTypes.STRING,
      status: DataTypes.STRING,
      time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bill",
      timestamps: false,
    }
  );
  return Bill;
};
