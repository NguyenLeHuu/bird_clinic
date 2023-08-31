"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Payment.belongsTo(models.Ordercarts,{foreignKey:'idorder'})
    }
  }
  Payment.init(
    {
      paymentid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      date: DataTypes.STRING,
      paymentmethod: DataTypes.STRING,
      total: DataTypes.DECIMAL,
      orderid: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
