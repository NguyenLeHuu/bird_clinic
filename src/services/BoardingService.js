const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (bird_size_id, boarding_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Boarding.findAll({
        where: {
          [Op.or]: [
            { bird_size_id: bird_size_id },
            { boarding_id: boarding_id },
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
      // let data = await db.Boarding.findByPk(id);
      let data = await db.Boarding.findOne({
        where: {
          boarding_id: id,
          include: [{ model: BoardingType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createBoarding = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.Boarding.create({
        service_package_id: id,
        bird_size_id: data.bird_size_id,
        boarding_id: data.boarding_id,
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

let updateBoarding = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Boarding.update(
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

let deleteBoarding = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Boarding.update(
        {
          status: 0,
        },
        {
          where: {
            boarding_id: id,
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
  createBoarding: createBoarding,
  updateBoarding: updateBoarding,
  deleteBoarding: deleteBoarding,
};
