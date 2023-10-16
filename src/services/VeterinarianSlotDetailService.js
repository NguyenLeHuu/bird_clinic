const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      if (!req.status) {
        data = await db.veterinarian_slot_details.findAll();
      } else {
        data = await db.veterinarian_slot_details.findAll({
          where: {
            status: req.status,
          },
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
      // let data = await db.VeterinarianSlotDetail.findByPk(id);
      let data = await db.veterinarian_slot_details.findOne({
        where: {
          veterinarian_slot_detail_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createVeterinarianSlotDetail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.veterinarian_slot_details.create({
        veterinarian_slot_detail_id: id,
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

let updateVeterinarianSlotDetail = (id, body_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.veterinarian_slot_details.update(
        {
          time_slot_id: body_data.time_slot_id,
          veterinarian_id: body_data.veterinarian_id,
          status: body_data.status,
        },
        {
          where: {
            veterinarian_slot_detail_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteVeterinarianSlotDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.veterinarian_slot_details.update(
        {
          status: "is_delete",
        },
        {
          where: {
            veterinarian_slot_detail_id: id,
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
  createVeterinarianSlotDetail: createVeterinarianSlotDetail,
  updateVeterinarianSlotDetail: updateVeterinarianSlotDetail,
  deleteVeterinarianSlotDetail: deleteVeterinarianSlotDetail,
};
