const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.medical_records.findAll({});
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
      let data = await db.medical_records.findOne({
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

let createMedicalRecord = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.medical_records.create({
        medical_record_id: id,
        symptom: data.symptom,
        diagnose: data.diagnose,
        recommendations: data.recommendations,
        service_form_detail_id: data.service_form_detail_id,
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
      let data = await db.medical_records.update(
        {
          symptom: data_body.symptom,
          diagnose: data_body.diagnose,
          recommendations: data_body.recommendations,
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
      let data = await db.medical_records.update(
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
