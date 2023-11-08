const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.medicines.findAll({});
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.Medicine.findByPk(id);
      let data = await db.medicines.findOne({
        where: {
          medicine_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createMedicine = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.medicines.create({
        medicine_id: id,
        name: data.name,
        unit: data.unit,
        usage: data.usage,
        description: data.description,
        sideEffects: data.sideEffects,
        status: 1,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateMedicine = (id, data_body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.medicines.update(
        {
          name: data_body.name,
          unit: data_body.unit,
          usage: data_body.usage,
          description: data_body.description,
          sideEffects: data_body.sideEffects,
        },
        {
          where: {
            medicine_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteMedicine = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.medicines.update(
        {
          status: 0,
        },
        {
          where: {
            medicine_id: id,
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
  createMedicine: createMedicine,
  updateMedicine: updateMedicine,
  deleteMedicine: deleteMedicine,
};
