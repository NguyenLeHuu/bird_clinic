"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {}
  }
  Customer.init(
    {
      customer_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      phone: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
      timestamps: false,
    }
  );
  return Customer;
};
