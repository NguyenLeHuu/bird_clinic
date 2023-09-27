const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.VeterinarianSlotDetail.findAll();
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
      let data = await db.VeterinarianSlotDetail.findOne({
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
      const result = await db.VeterinarianSlotDetail.create({
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

let updateVeterinarianSlotDetail = (
  id,
  name,
  quantity,
  price,
  mainimg,
  detail
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.VeterinarianSlotDetail.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          detail: detail,
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
      let data = await db.VeterinarianSlotDetail.update(
        {
          status: 0,
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
