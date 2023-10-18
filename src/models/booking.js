"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {}
  }
  Booking.init(
    {
      booking_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      account_id: DataTypes.STRING,
      time_id: DataTypes.STRING,
      bird_id: DataTypes.STRING,
      veterinarian_id: DataTypes.STRING,
      symptom: DataTypes.STRING,
      status: DataTypes.STRING,
      diagnosis: DataTypes.STRING,
      recommendations: DataTypes.STRING,
      temperature: DataTypes.STRING,
      weight: DataTypes.STRING,
      booking_date: DataTypes.STRING,
      estimate_time: DataTypes.STRING,
      money_has_paid: DataTypes.STRING,
      checkin_time: DataTypes.STRING,
      customer_name: DataTypes.STRING,
      qr_code: DataTypes.STRING,
      note: DataTypes.STRING,
      service_type: DataTypes.STRING,
      arrival_date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "booking",
      timestamps: false,
    }
  );
  return Booking;
};
