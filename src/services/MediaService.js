const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (type, type_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.medias.findAll({
        where: {
          [Op.and]: [{ type: type }, { type_id: type_id }],
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
      // let data = await db.Media.findByPk(id);
      let data = await db.medias.findOne({
        where: {
          media_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createMedia = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");

      const result = await db.medias.create({
        media_id: id,
        type: data.type,
        type_id: data.type_id,
        link: url,
        is_before: data.is_before,
        is_after: data.is_after,
        type_service: data.type_service,
        status: 1,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateMedia = (id, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.medias.update(
        {
          link: url,
        },
        {
          where: {
            media_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteMedia = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.medias.update(
        {
          status: 0,
        },
        {
          where: {
            media_id: id,
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
  createMedia: createMedia,
  updateMedia: updateMedia,
  deleteMedia: deleteMedia,
};
