"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service_Form_detail extends Model {
    static associate(models) {
      Service_Form_detail.belongsTo(models.service_form, {
        foreignKey: "service_form_id",
      });
      Service_Form_detail.belongsTo(models.service_package, {
        foreignKey: "service_package_id",
      });
      Service_Form_detail.belongsTo(models.veterinarian, {
        foreignKey: "veterinarian_id",
      });
    }
  }
  Service_Form_detail.init(
    {
      service_form_detail_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      service_package_id: DataTypes.STRING,
      service_form_id: DataTypes.STRING,
      note: DataTypes.STRING,
      status: DataTypes.STRING,
      veterinarian_id: DataTypes.STRING,
      process_at: DataTypes.STRING,
      booking_id: DataTypes.STRING,
      checkin_time: DataTypes.STRING,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "service_form_detail",
      timestamps: false,
    }
  );
  return Service_Form_detail;
};
