"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContentChat extends Model {
    static associate(models) {}
  }
  ContentChat.init(
    {
      content_chat_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      user1: DataTypes.STRING,
      user2: DataTypes.STRING,
      message: DataTypes.STRING,
      type: DataTypes.STRING,
      chat_id: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "content_chats",
      timestamps: false,
    }
  );
  return ContentChat;
};
