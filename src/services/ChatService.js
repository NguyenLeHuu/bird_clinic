const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (bird_size_id, chat_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.chat.findAll({
        where: {
          [Op.or]: [{ bird_size_id: bird_size_id }, { chat_id: chat_id }],
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
      // let data = await db.Chat.findByPk(id);
      let data = await db.chat.findOne({
        where: {
          chat_id: id,
          include: [{ model: ChatType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createChat = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.chat.create({
        service_package_id: id,
        bird_size_id: data.bird_size_id,
        chat_id: data.chat_id,
        price: data.price,
        description: data.description,
        package_name: data.package_name,
        status: 1,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateChat = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.chat.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          detail: detail,
        },
        {
          where: {
            account_id: id,
          },
        }
      );
      resolve(data);
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
