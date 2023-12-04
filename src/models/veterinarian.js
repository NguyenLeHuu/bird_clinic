"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Veterinarian extends Model {
    static associate(models) {
      // Veterinarian.belongsTo(models.service, { foreignKey: "service_id" });
      Veterinarian.belongsTo(models.account, { foreignKey: "account_id" });
      Veterinarian.hasMany(models.veterinarian_slot_details, {
        foreignKey: "veterinarian_id",
      });
      Veterinarian.hasMany(models.booking, {
        foreignKey: "veterinarian_id",
      });
      Veterinarian.hasMany(models.service_form_detail, {
        foreignKey: "veterinarian_id",
      });
    }
  }
  Veterinarian.init(
    {
      veterinarian_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      account_id: DataTypes.STRING,
      specialized: DataTypes.STRING,
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
      service_id: DataTypes.STRING,
      service_name: DataTypes.STRING,
      service_type_id: DataTypes.STRING,
      is_primary: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "veterinarian",
      timestamps: false,
    }
  );
  return Veterinarian;
};
