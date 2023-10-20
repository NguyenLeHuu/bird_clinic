const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (bird_size_id, content_chat_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.content_chat.findAll({
        where: {
          [Op.or]: [
            { bird_size_id: bird_size_id },
            { content_chat_id: content_chat_id },
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
          include: [{ model: ContentChatType, attributes: ["name"] }],
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
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.content_chat.create({
        service_package_id: id,
        bird_size_id: data.bird_size_id,
        content_chat_id: data.content_chat_id,
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

let updateContentChat = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.content_chat.update(
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
