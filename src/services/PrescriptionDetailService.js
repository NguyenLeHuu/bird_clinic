const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.prescription_details.findAll();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.PrescriptionDetail.findByPk(id);
      let data = await db.prescription_details.findOne({
        where: {
          prescription_detail_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createPrescriptionDetail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.prescription_details.create({
        prescription_detail_id: id,
        prescription_id: data.prescription_id,
        medicine_id: data.medicine_id,
        usage: data.usage,
        total_dose: data.total_dose,
        dose: data.dose,
        day: data.day,
        note: data.note,
        status: 1,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updatePrescriptionDetail = (id, body_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.prescription_details.update(
        {
          medicine_id: body_data.medicine_id,
          usage: body_data.usage,
          total_dose: body_data.total_dose,
          dose: body_data.dose,
          day: body_data.day,
        },
        {
          where: {
            prescription_detail_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deletePrescriptionDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.prescription_details.update(
        {
          status: 0,
        },
        {
          where: {
            prescription_detail_id: id,
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
  createPrescriptionDetail: createPrescriptionDetail,
  updatePrescriptionDetail: updatePrescriptionDetail,
  deletePrescriptionDetail: deletePrescriptionDetail,
};
