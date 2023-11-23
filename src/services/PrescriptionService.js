const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data;
      if (req.booking_id) {
        data = await db.prescription.findOne({
          where: {
            booking_id: req.booking_id,
          },
          attributes: [
            "prescription_id",
            "booking_id",
            "time_created",
            "status",
          ],
          include: [
            {
              model: db.prescription_detail,
              include: [
                {
                  model: db.medicine,
                  attributes: ["name", "unit"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
      } else {
        data = await db.prescription.findAll({
          attributes: [
            "prescription_id",
            "booking_id",
            "time_created",
            "status",
          ],
        });
      }

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.Prescription.findByPk(id);
      let data = await db.prescription.findOne({
        where: {
          prescription_id: id,
        },
        attributes: ["prescription_id", "booking_id", "time_created", "status"],
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createPrescription = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.prescription.create({
        prescription_id: id,
        booking_id: data.booking_id,
        status: "1",
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updatePrescription = (id, data_body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.prescription.update(
        {
          note: data_body.note,
          usage: data_body.usage,
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

let deletePrescription = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.prescription.update(
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
  createPrescription: createPrescription,
  updatePrescription: updatePrescription,
  deletePrescription: deletePrescription,
};
