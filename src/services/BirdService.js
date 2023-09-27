const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Bird.findAll({
        where: {
          customer_id: id,
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
      // let data = await db.Bird.findByPk(id);
      let data = await db.Bird.findOne({
        where: {
          bird_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createBird = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.Bird.create({
        bird_id: id,
        customer_id: data.customer_id,
        name: data.name,
        gender: data.gender,
        hatching_date: data.hatching_date,
        ISO_microchip: data.ISO_microchip,
        weight: data.weight,
        color: data.color,
        breed: data.breed,
        status: 1,
        image: url,
        size: data.size,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateBird = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Bird.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          detail: detail,
        },
        {
          where: {
            bird_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBird = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Bird.update(
        {
          status: 0,
        },
        {
          where: {
            bird_id: id,
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
  createBird: createBird,
  updateBird: updateBird,
  deleteBird: deleteBird,
};