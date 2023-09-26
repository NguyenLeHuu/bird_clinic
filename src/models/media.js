"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    static associate(models) {}
  }
  Media.init(
    {
      media_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      type: DataTypes.STRING,
      type_id: DataTypes.STRING,
      link: DataTypes.STRING,
      is_before: DataTypes.STRING,
      is_after: DataTypes.STRING,
      type_service: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Media",
      timestamps: false,
    }
  );
  return Media;
};
