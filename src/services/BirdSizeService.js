const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bird_sizes.findAll({
        // where: {
        //   [Op.and]: [{ type: type }, { type_id: type_id }],
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
      // let data = await db.Media.findByPk(id);
      let data = await db.bird_sizes.findOne({
        where: {
          bird_size_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createBirdSize = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");

      const result = await db.bird_sizes.create({
        bird_size_id: id,
        size: req.size,
        breeds: req.breeds,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateBirdSize = (id, req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bird_sizes.update(
        {
          size: req.size,
          breeds: req.breeds,
        },
        {
          where: {
            bird_size_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBirdSize = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bird_sizes.update(
        {
          status: 0,
        },
        {
          where: {
            bird_size_id: id,
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
  createBirdSize,
  updateBirdSize,
  deleteBirdSize,
};
