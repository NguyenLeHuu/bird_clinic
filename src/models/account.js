"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {}
  }
  Account.init(
    {
      account_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "account",
      timestamps: false,
    }
  );
  return Account;
};
