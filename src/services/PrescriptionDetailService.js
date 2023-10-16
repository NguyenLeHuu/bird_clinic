const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.prescriptionDetail.findAll();
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
      let data = await db.prescriptionDetail.findOne({
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
      const result = await db.prescriptionDetail.create({
        prescription_id: id,
        booking_id: data.booking_id,
        time_created: data.time_created,
        note: data.note,
        usage: data.usage,
        status: data.status,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updatePrescriptionDetail = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.prescriptionDetail.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          detail: detail,
        },
        {
          where: {
            prescription_id: id,
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
      let data = await db.prescriptionDetail.update(
        {
          status: 0,
        },
        {
          where: {
            prescription_id: id,
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
