const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result;
      if (req.booking_id) {
        let data = await db.bill.findAll({
          where: { booking_id: req.booking_id },
          include: [
            {
              model: db.bill_detail,
              include: [
                {
                  model: db.service_package,
                  attributes: ["package_name"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });

        result = [].concat(...data.map((item) => item.dataValues.bill_details));
        console.log(result);
      } else {
        result = await db.bill_detail.findAll({});
      }
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.BillDetail.findByPk(id);
      let data = await db.bill_detail.findOne({
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
      const result = await db.bill_detail.create({
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
      let data = await db.bill_detail.update(
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
      let data = await db.bill_detail.update(
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
