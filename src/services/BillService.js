const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data;
      if (req.booking_id) {
        data = await db.bill.findAll({
          where: { booking_id: req.booking_id },
        });
      } else {
        data = await db.bill.findAll({});
      }

      resolve(data);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.Bill.findByPk(id);
      let data = await db.bill.findOne({
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

let createBill = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const id = crypto.randomBytes(15).toString("hex");
      const id = `HD_${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
      const result = await db.bill.create({
        bill_id: id,
        title: data.title,
        total_price: data.total_price,
        service_form_id: data.service_form_id,
        booking_id: data.booking_id,
        payment_method: data.payment_method,
        transaction_id: data.transaction_id,
        status: 1,
        // time_create: data.time_create,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateBill = (id, body_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bill.update(
        {
          payment_method: body_data.payment_method,
          transaction_id: body_data.transaction_id,
          status: body_data.status,
          // time_create: body_data.time_create,
        },
        {
          where: {
            bill_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

let deleteBill = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bill.update(
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
