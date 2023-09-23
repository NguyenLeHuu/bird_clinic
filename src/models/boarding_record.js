"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoardingRecord extends Model {
    static associate(models) {}
  }
  BoardingRecord.init(
    {
      boarding_record_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      boarding_id: DataTypes.STRING,
      time_report: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BoardingRecord",
      timestamps: false,
    }
  );
  return BoardingRecord;
};
