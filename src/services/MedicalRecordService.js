const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (type, type_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.MedicalRecord.findAll({
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
      // let data = await db.MedicalRecord.findByPk(id);
      let data = await db.MedicalRecord.findOne({
        where: {
          medical_record_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createMedicalRecord = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.MedicalRecord.create({
        medical_record_id: id,
        type: data.type,
        type_id: data.type_id,
        link: data.link,
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

let updateMedicalRecord = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.MedicalRecord.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          detail: detail,
        },
        {
          where: {
            medical_record_id: id,
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
      let data = await db.MedicalRecord.update(
        {
          status: 0,
        },
        {
          where: {
            medical_record_id: id,
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
