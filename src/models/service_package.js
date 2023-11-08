"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServicePackage extends Model {
    static associate(models) {
      ServicePackage.belongsTo(models.services, {
        foreignKey: "service_id",
      });
      ServicePackage.hasMany(models.service_form_details, {
        foreignKey: "service_package_id",
      });
    }
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
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "service_packages",
      timestamps: false,
    }
  );
  return ServicePackage;
};
