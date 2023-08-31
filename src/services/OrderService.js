const db = require("../models/index");
const crypto = require("crypto");
const Utils = require("./Utils");
const OrderDetailService = require("../services/OrderDetailService");

let sequelize = db.sequelize;

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.findAll({
        include: [
          {
            model: db.OrderDetail,
            attributes: ["quantity"],
            include: [
              {
                model: db.Product,
                attributes: ["productid", "name", "price", "mainimg"],
              },
            ],
          },
          {
            model: db.Customer,
          },
        ],
        order: [["date", "DESC"]],
        raw: false,
        nest: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getByCustomer = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.findAll({
        include: [
          {
            model: db.OrderDetail,
            include: [
              {
                model: db.Product,
                attributes: ["productid", "name", "price", "status", "mainimg"],
                include: [
                  {
                    model: db.Category,
                    attributes: ["catename"],
                    include: [
                      {
                        model: db.Saler,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        raw: false,
        nest: true,
        where: {
          customerid: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createOrder = (id, customerid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = Math.floor(Math.random() * 1000000000);
      let data = await db.Order.create({
        orderid: id,
        date: new Date(),
        totalmoney: 0,
        customerid: customerid,
        status: "cart",
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateOrderStatus = (orderid, tracking, total) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.update(
        {
          date: new Date(),
          status: tracking,
          totalmoney: total,
        },
        {
          where: {
            orderid: orderid,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateCartTotal = (orderid, totalmoney) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.update(
        {
          totalmoney: totalmoney,
        },
        {
          where: {
            orderid: orderid,
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
  getByCustomer: getByCustomer,
  createOrder: createOrder,
  updateOrderStatus: updateOrderStatus,
  updateCartTotal: updateCartTotal,
};
