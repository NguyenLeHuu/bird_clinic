const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.cage.findAll({
        // where: {
        //   [Op.or]: [{ bird_size_id: bird_size_id }, { cage_id: cage_id }],
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
      // let data = await db.Cage.findByPk(id);
      let data = await db.cage.findOne({
        where: {
          cage_id: id,
          // include: [{ model: CageType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createCage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const id = crypto.randomBytes(15).toString("hex");
      const result = await db.cage.create({
        boarding_id: data.boarding_id,
        bird_id: data.bird_id,
        status: "available",
        size: data.size,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateCage = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.cage.update(
        {
          boarding_id: data.boarding_id,
          bird_id: data.bird_id,
          status: data.status,
        },
        {
          where: {
            cage_id: id,
          },
        }
      );
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.cage.update(
        {
          status: 0,
        },
        {
          where: {
            cage_id: id,
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
  createCage: createCage,
  updateCage: updateCage,
  deleteCage: deleteCage,
};
