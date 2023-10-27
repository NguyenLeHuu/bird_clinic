const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      if (req.date) {
        data = await db.time_slot_clinic.findAll({
          where: {
            date: req.date,
          },
          include: [
            {
              model: db.slot_clinics,
              attributes: ["time"],
            },
          ],
          // group:"date",
          order: [[db.slot_clinics, "time", "ASC"]],
          raw: true,
          nest: true,
        });
      } else {
        data = await db.time_slot_clinic.findAll({
          include: [
            {
              model: db.slot_clinics,
              attributes: ["time"],
            },
          ],
          // group:"date",
          order: [[db.slot_clinics, "time", "ASC"]],
          raw: true,
          nest: true,
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
      // let data = await db.TimeSlotClinic.findByPk(id);
      let data = await db.time_slot_clinic.findOne({
        where: {
          time_slot_clinic_id: id,
          // include: [{ model: TimeSlotClinicType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createTimeSlotClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.time_slot_clinic.create({
        time_slot_clinic_id: id,
        slot_clinic_id: data.slot_clinic_id,
        date: data.date,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateTimeSlotClinic = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.time_slot_clinic.update(
        {
          slot_clinic_id: data.slot_clinic_id,
          date: data.date,
        },
        {
          where: {
            time_slot_clinic_id: id,
          },
        }
      );
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteTimeSlotClinic = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.time_slot_clinic.update(
        {
          status: 0,
        },
        {
          where: {
            time_slot_clinic_id: id,
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
  createTimeSlotClinic: createTimeSlotClinic,
  updateTimeSlotClinic: updateTimeSlotClinic,
  deleteTimeSlotClinic: deleteTimeSlotClinic,
};
