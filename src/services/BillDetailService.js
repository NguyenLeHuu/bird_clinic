const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bill_details.findAll({});
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
      let data = await db.bill_details.findOne({
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

let createBillDetail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.bill_details.create({
        bill_detail_id: id,
        bill_id: data.bill_id,
        service_package_id: data.service_package_id,
        price: data.price,
        // quantity: data.quantity,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateBillDetail = (id, data_body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bill_details.update(
        {
          // bill_id: data_body.bill_id,
          // service_package_id: data_body.service_package_id,
          // price: data_body.price,
          // detail: data_body.detail,
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
      let data = await db.bill_details.update(
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
