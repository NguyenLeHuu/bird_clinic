"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServiceType extends Model {
    static associate(models) {
      ServiceType.hasMany(models.services, { foreignKey: "service_type_id" });
    }
  }
  ServiceType.init(
    {
      service_type_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "service_types",
      timestamps: false,
    }
  );
  return ServiceType;
};
