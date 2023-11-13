const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.chat_id || !req.user1 || !req.user2) {
        reject("Truyền đủ giùm cái");
      }
      let data = await db.content_chat.findAll({
        where: {
          [Op.and]: [
            { chat_id: req.chat_id },
            { user1: req.user1 },
            { user2: req.user2 },
          ],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.ContentChat.findByPk(id);
      let data = await db.content_chat.findOne({
        where: {
          content_chat_id: id,
          // include: [{ model: ContentChatType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createContentChat = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = url
        ? await db.content_chat.create({
            user1: data.user1,
            user2: data.user2,
            message: data.message,
            type: data.type,
            chat_id: data.chat_id,
            status: 1,
          })
        : await db.content_chat.create({
            user1: data.user1,
            user2: data.user2,
            message: data.message,
            type: data.type,
            img_link: url,
            chat_id: data.chat_id,
            status: 1,
          });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateContentChat = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.content_chat.update(
        {
          status: data.status,
        },
        {
          where: {
            content_chat_id: id,
          },
        }
      );
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteContentChat = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.content_chat.update(
        {
          status: 0,
        },
        {
          where: {
            content_chat_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAll: getAll,
  getOne: getOne,
  createContentChat: createContentChat,
  updateContentChat: updateContentChat,
  deleteContentChat: deleteContentChat,
};
