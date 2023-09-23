"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServiceType extends Model {
    static associate(models) {}
  }
  ServiceType.init(
    {
      service_type_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ServiceType",
      timestamps: false,
    }
  );
  return ServiceType;
};
