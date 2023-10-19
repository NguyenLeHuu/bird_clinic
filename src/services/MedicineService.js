const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.medicine.findAll({});
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.MedicalRecord.findByPk(id);
      let data = await db.medicine.findOne({
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

let createMedicalRecord = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.medicine.create({
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

let updateMedicalRecord = (id, data_body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.medicine.update(
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

let deleteMedicalRecord = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.medicine.update(
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
  createMedicalRecord: createMedicalRecord,
  updateMedicalRecord: updateMedicalRecord,
  deleteMedicalRecord: deleteMedicalRecord,
};
