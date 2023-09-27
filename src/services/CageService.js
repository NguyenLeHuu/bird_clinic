const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (bird_size_id, cage_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Cage.findAll({
        where: {
          [Op.or]: [{ bird_size_id: bird_size_id }, { cage_id: cage_id }],
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
      // let data = await db.Cage.findByPk(id);
      let data = await db.Cage.findOne({
        where: {
          cage_id: id,
          include: [{ model: CageType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createCage = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.Cage.create({
        service_package_id: id,
        bird_size_id: data.bird_size_id,
        cage_id: data.cage_id,
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

let updateCage = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Cage.update(
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

let deleteCage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Cage.update(
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
