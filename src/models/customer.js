"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsTo(models.accounts, {
        foreignKey: "account_id",
      });
      Customer.hasMany(models.birds, {
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
      total_spent: DataTypes.DECIMAL,
      membership: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "customers",
      timestamps: false,
    }
  );
  return Customer;
};
