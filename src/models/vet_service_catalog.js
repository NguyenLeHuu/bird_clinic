"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VetServiceCatalog extends Model {
    static associate(models) {
      VetServiceCatalog.belongsTo(models.veterinarian, {
        foreignKey: "veterinarian_id",
      });
      VetServiceCatalog.belongsTo(models.service, {
        foreignKey: "service_id",
      });
      // VetServiceCatalog.hasMany(models.booking, {
      //   foreignKey: "bird_id",
      // });
    }
  }
  VetServiceCatalog.init(
    {
      vet_service_catalog_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      veterinarian_id: DataTypes.STRING,
      service_id: DataTypes.STRING,
      veterinarian_name: DataTypes.STRING,
      service_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "vet_service_catalogs",
      timestamps: false,
    }
  );
  return VetServiceCatalog;
};
