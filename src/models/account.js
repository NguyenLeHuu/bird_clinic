"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.hasMany(models.booking, {
        foreignKey: "account_id",
      });
      Account.hasMany(models.customer, {
        foreignKey: "account_id",
      });
      Account.hasMany(models.veterinarian, {
        foreignKey: "account_id",
      });
    }
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
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "account",
      timestamps: false,
    }
  );
  return Account;
};
