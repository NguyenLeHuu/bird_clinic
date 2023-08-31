const db = require("../models/index");
const crypto = require("crypto");
const OrderService = require("./OrderService");

let sequelize = db.sequelize;

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.findOne({
        attributes: ["orderid", "date", "totalmoney", "status"],
        include: [
          {
            model: db.Customer,
            attributes: ["customerid", "name", "email"],
          },
          {
            model: db.OrderDetail,
            attributes: ["orderdetailid", "quantity"],
            include: [
              {
                model: db.Product,
                attributes: ["productid", "name", "mainimg"],
              },
            ],
          },
        ],
        where: {
          orderid: id,
        },
        raw: false,
        nest: true,
      });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOrderDetail = (orderdetailid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderDetail.findOne({
        where: {
          orderdetailid: orderdetailid,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let addOrderDetail = (orderid, productid, quantity, salerid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salername = await db.Saler.findOne({
        attributes: ["name"],
        where: {
          salerid: salerid,
        },
      });
      const checkDuplicate = await db.OrderDetail.findAll({
        where: {
          orderid: orderid,
          productid: productid,
        },
      });

      let data;

      if (Array.isArray(checkDuplicate) && checkDuplicate.length > 0) {
        console.log(checkDuplicate);
        quantity = parseInt(checkDuplicate[0].quantity) + parseInt(quantity);

        data = await db.OrderDetail.update(
          {
            quantity: quantity,
          },
          {
            where: {
              orderdetailid: checkDuplicate[0].orderdetailid,
            },
          }
        );
      } else {
        data = await db.OrderDetail.create({
          quantity: quantity,
          orderid: orderid,
          productid: productid,
          salername: salername.name,
        });
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateOrderDetail = (orderdetailid, quantity) => {
  if (quantity !== 0) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.OrderDetail.update(
          {
            quantity: quantity,
          },
          {
            where: {
              orderdetailid: orderdetailid,
            },
          }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  } else deleteOrderDetail(orderdetailid);
};

let deleteOrderDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderDetail.destroy({
        where: {
          orderdetailid: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAll: getAll,
  addOrderDetail: addOrderDetail,
  updateOrderDetail: updateOrderDetail,
  deleteOrderDetail: deleteOrderDetail,
  getOrderDetail,
};
