"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {}
  }
  Service.init(
    {
      service_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      service_type_id: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "service",
      timestamps: false,
    }
  );
  return Service;
};
