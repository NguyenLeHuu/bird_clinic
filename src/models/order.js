"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Customer, { foreignKey: "customerid" });
      Order.hasMany(models.OrderDetail, { foreignKey: "orderid" });
    }
  }
  Order.init(
    {
      orderid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      date: DataTypes.DATE,
      totalmoney: DataTypes.DECIMAL,
      customerid: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
