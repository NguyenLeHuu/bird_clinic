"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Boarding extends Model {
    static associate(models) {
      // Boarding.belongsTo(models.account, {
      //   foreignKey: "account_id",
      // });
      Boarding.hasMany(models.chat, {
        foreignKey: "boarding_id",
      });
    }
  }
  Boarding.init(
    {
      boarding_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      booking_id: DataTypes.STRING,
      arrival_date: DataTypes.STRING,
      departure_date: DataTypes.STRING,
      room_type: DataTypes.STRING,
      bird_id: DataTypes.STRING,
      act_arrival_date: DataTypes.STRING,
      act_departure_date: DataTypes.STRING,
      cage_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "boarding",
      timestamps: false,
    }
  );
  return Boarding;
};
