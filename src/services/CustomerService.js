const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAllCustomer = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Customer.findAll({
        attributes: [
          "productid",
          "name",
          "quantity",
          "price",
          "status",
          "detail",
          "mainimg",
        ],
        include: [
          {
            model: db.Category,
            attributes: ["catename"],
          },
        ],
        raw: false,
        nest: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getAll = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        data.name = "";
      }
      if (!data.catename) {
        data.category = "";
      }
      if (!data.limit) {
        data.limit = 100;
      }
      if (!data.status) {
        data.status = "";
      }
      if (!data.min) {
        data.min = 0;
      }
      if (!data.max) {
        data.max = 10000000; //gia cao nhat
      }

      let products = await db.Customer.findAll({
        include: [
          {
            model: db.Category,
            where: {
              catename: {
                [Op.like]: `%${data.catename.trim()}%`,
              },
            },
          },
        ],
        raw: true,
        nest: true,
        where: {
          [Op.and]: [
            // {
            //   idcollection: {
            //     [Op.eq]: `${data.idcollection.trim()}`,
            //   },
            // },
            {
              name: {
                [Op.like]: `%${data.name.trim()}%`,
              },
            },
            {
              status: {
                [Op.like]: `%${data.status.trim()}%`,
              },
            },
            // {
            //   catename: {
            //     [Op.like]: `${data.category}`,
            //   },
            // },
            {
              price: {
                [Op.between]: [`${data.min}`, `${data.max}`],
              },
            },
          ],
        },
        offset: (data.page - 1) * data.limit || 0,
        limit: Number(data.limit),
      });
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Customer.findByPk(id);
      //   let data = await db.Customer.findAll({
      //     where: {
      //       productid: id,
      //     },
      //     include: {
      //       model: db.Image,
      //       // attributes: [
      //       //   "image",
      //       // ],
      //       group: "productid",
      //     },
      //     raw: false,
      //     nest: true,
      //   });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createCustomer = (data, url) => {
  // let createCustomer = (data, image) => {

  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.Customer.create({
        customer_id: id,
        account_id: data.account_id,
        email: data.email,
        address: data.address,
        name: data.name,
        status: 1,
        phone: data.phone,
        image: url,
      });

      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateCustomer = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Customer.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          detail: detail,
        },
        {
          where: {
            productid: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCustomer = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Customer.update(
        {
          status: 0,
        },
        {
          where: {
            productid: id,
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
  getAllCustomer: getAllCustomer,
  getOne: getOne,
  getAll: getAll,
  createCustomer: createCustomer,
  updateCustomer: updateCustomer,
  deleteCustomer: deleteCustomer,
};
