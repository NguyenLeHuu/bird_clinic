"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BillDetail extends Model {
    static associate(models) {
      BillDetail.belongsTo(models.bill, {
        foreignKey: "bill_id",
      });
      BillDetail.belongsTo(models.service_package, {
        foreignKey: "service_package_id",
      });
      // Bird.hasMany(models.booking, {
      //   foreignKey: "bird_id",
      // });
    }
  }
  BillDetail.init(
    {
      bill_detail_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      bill_id: DataTypes.STRING,
      service_package_id: DataTypes.STRING,
      price: DataTypes.STRING,
      // quantity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "bill_detail",
      timestamps: false,
    }
  );
  return BillDetail;
};
