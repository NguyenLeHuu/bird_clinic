const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.slot_clinics.findAll({
        // where: {
        //   [Op.or]: [{ bird_size_id: bird_size_id }, { slot_clinic_id: slot_clinic_id }],
        // },
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
      // let data = await db.SlotClinic.findByPk(id);
      let data = await db.slot_clinics.findOne({
        where: {
          slot_clinic_id: id,
          // include: [{ model: SlotClinicType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createSlotClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.slot_clinics.create({
        slot_clinic_id: id,
        time: data.time,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateSlotClinic = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.slot_clinics.update(
        {
          time: data.time,
        },
        {
          where: {
            slot_clinic_id: id,
          },
        }
      );
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteSlotClinic = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.slot_clinics.update(
        {
          status: 0,
        },
        {
          where: {
            slot_clinic_id: id,
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
  createSlotClinic: createSlotClinic,
  updateSlotClinic: updateSlotClinic,
  deleteSlotClinic: deleteSlotClinic,
};
