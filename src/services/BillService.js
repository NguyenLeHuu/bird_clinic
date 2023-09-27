const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Bill.findAll({
        where: {
          bill_id: id,
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
      // let data = await db.Bill.findByPk(id);
      let data = await db.Bill.findOne({
        where: {
          bill_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createBill = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.Bill.create({
        bill_id: id,
        bill_id: data.bill_id,
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

let updateBill = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Bill.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          detail: detail,
        },
        {
          where: {
            bill_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBill = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Bill.update(
        {
          status: 0,
        },
        {
          where: {
            bill_id: id,
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
  createBill: createBill,
  updateBill: updateBill,
  deleteBill: deleteBill,
};
