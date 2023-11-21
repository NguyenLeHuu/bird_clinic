const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (type, type_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.sequelize.query(
        `
            SELECT * FROM medias WHERE type=:type AND type_id = :type_id
      
          `,
        // WHERE c.status = 'un_available';
        {
          replacements: { type: type, type_id: type_id },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
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
      let data = await db.media.findOne({
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

let createMedia = (data, listImage) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result;
      console.log("image list");
      console.log(listImage);
      if (listImage.length > 1) {
        for (const item of listImage) {
          const id = crypto.randomBytes(15).toString("hex");
          result = await db.medias.create({
            media_id: id,
            type: data.type,
            type_id: data.type_id,
            link: item,
            is_before: data.is_before,
            is_after: data.is_after,
            type_service: data.type_service,
            status: 1,
          });
        }
        resolve("thanh cong");
      } else {
        const id = crypto.randomBytes(15).toString("hex");
        result = await db.medias.create({
          media_id: id,
          type: data.type,
          type_id: data.type_id,
          link: listImage[0],
          is_before: data.is_before,
          is_after: data.is_after,
          type_service: data.type_service,
          status: 1,
        });
        resolve(result);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateMedia = (id, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.media.update(
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
      let data = await db.media.update(
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
