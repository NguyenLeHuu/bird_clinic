"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsTo(models.account, {
        foreignKey: "account_id",
      });
      Customer.hasMany(models.bird, {
        foreignKey: "customer_id",
      });
    }
  }
  Customer.init(
    {
      customer_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      account_id: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      phone: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "customer",
      timestamps: false,
    }
  );
  return Customer;
};
