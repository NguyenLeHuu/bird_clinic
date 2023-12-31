"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.bird, {
        foreignKey: "bird_id",
      });
      Booking.belongsTo(models.veterinarian, {
        foreignKey: "veterinarian_id",
      });
      Booking.hasMany(models.service_form, {
        foreignKey: "booking_id",
      });
      Booking.hasOne(models.boarding, {
        foreignKey: "booking_id",
      });
    }
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

      booking_date: DataTypes.STRING,
      estimate_time: DataTypes.STRING,
      money_has_paid: DataTypes.STRING,
      checkin_time: DataTypes.STRING,
      customer_name: DataTypes.STRING,
      qr_code: DataTypes.STRING,
      note: DataTypes.STRING,
      service_type: DataTypes.STRING,
      arrival_date: DataTypes.STRING,
      tracking: DataTypes.STRING,
      service_type_id: DataTypes.STRING,
      is_re_exam: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "booking",
      timestamps: false,
    }
  );
  return Booking;
};
