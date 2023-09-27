const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.BillDetail.findAll({
        where: {
          bill_detail_id: id,
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
      // let data = await db.BillDetail.findByPk(id);
      let data = await db.BillDetail.findOne({
        where: {
          bill_detail_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createBillDetail = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.BillDetail.create({
        bill_detail_id: id,
        bill_detail_id: data.bill_detail_id,
        name: data.name,
        gender: data.gender,
        hatching_date: data.hatching_date,
        ISO_microchip: data.ISO_microchip,
        weight: data.weight,
        color: data.color,
        breed: data.breed,
        status: 1,
        image: url,
        size: data.size,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateBillDetail = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.BillDetail.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          detail: detail,
        },
        {
          where: {
            bill_detail_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBillDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.BillDetail.update(
        {
          status: 0,
        },
        {
          where: {
            bill_detail_id: id,
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
  createBillDetail: createBillDetail,
  updateBillDetail: updateBillDetail,
  deleteBillDetail: deleteBillDetail,
};
