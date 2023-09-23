"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServicePackage extends Model {
    static associate(models) {}
  }
  ServicePackage.init(
    {
      service_package_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      bird_size_id: DataTypes.STRING,
      service_id: DataTypes.STRING,
      price: DataTypes.STRING,
      description: DataTypes.STRING,
      package_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ServicePackage",
      timestamps: false,
    }
  );
  return ServicePackage;
};
