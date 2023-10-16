const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.veterinarian.findAll();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.Veterinarian.findByPk(id);
      let data = await db.veterinarian.findOne({
        where: {
          veterinarian_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createVeterinarian = (data, url) => {
  // let createVeterinarian = (data, image) => {

  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.veterinarian.create({
        veterinarian_id: id,
        account_id: data.account_id,
        specialized: data.specialized,
        name: data.name,
        status: 1,
        image: url,
      });

      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateVeterinarian = (id, body_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.veterinarian.update(
        {
          specialized: body_data.specializedme,
          status: body_data.status,
        },
        {
          where: {
            veterinarian_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteVeterinarian = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.veterinarian.update(
        {
          status: 0,
        },
        {
          where: {
            veterinarian_id: id,
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
  getOne: getOne,
  getAll: getAll,
  createVeterinarian: createVeterinarian,
  updateVeterinarian: updateVeterinarian,
  deleteVeterinarian: deleteVeterinarian,
};
