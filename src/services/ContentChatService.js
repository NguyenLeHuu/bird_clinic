const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.content_chat.findAll({
        // where: {
        //   [Op.or]: [
        //     { bird_size_id: bird_size_id },
        //     { content_chat_id: content_chat_id },
        //   ],
        // },
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

let createContentChat = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const id = crypto.randomBytes(15).toString("hex");
      const result = await db.content_chat.create({
        // content_chat_id: id,
        user1: data.user1,
        user2: data.user2,
        message: data.message,
        type: data.type,
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
