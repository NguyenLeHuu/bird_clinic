const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (bird_size_id, chat_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.chat.findAll({
        // where: {
        //   [Op.or]: [{ bird_size_id: bird_size_id }, { chat_id: chat_id }],
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
      // let data = await db.Chat.findByPk(id);
      let data = await db.chat.findOne({
        where: {
          chat_id: id,
          // include: [{ model: ChatType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createChat = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.chat.create({
        chat_id: id,
        boarding_id: data.boarding_id,
        bird_id: data.bird_id,
        customer_id: data.customer_id,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateChat = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.chat.update(
        {
          status: data.status,
        },
        {
          where: {
            chat_id: id,
          },
        }
      );
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteChat = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.chat.update(
        {
          status: 0,
        },
        {
          where: {
            chat_id: id,
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
  createChat: createChat,
  updateChat: updateChat,
  deleteChat: deleteChat,
};
