"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.belongsTo(models.service_type, {
        foreignKey: "service_type_id",
      });
      Service.hasMany(models.service_package, { foreignKey: "service_id" });
      Service.hasMany(models.vet_service_catalogs, {
        foreignKey: "service_id",
      });
    }
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
