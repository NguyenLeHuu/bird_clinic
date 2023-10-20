"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {}
  }
  Chat.init(
    {
      chat_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      boarding_id: DataTypes.STRING,
      bird_id: DataTypes.STRING,
      customer_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "chat",
      timestamps: false,
    }
  );
  return Chat;
};
