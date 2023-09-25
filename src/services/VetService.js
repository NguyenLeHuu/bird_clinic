const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAllVeterinarian = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Veterinarian.findAll({
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

      let products = await db.Veterinarian.findAll({
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
      let data = await db.Veterinarian.findByPk(id);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createVeterinarian = (data, url) => {
  // let createVeterinarian = (data, image) => {

  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.Veterinarian.create({
        veterinarian_id: id,
        account_id: data.account_id,
        specialized: data.specialized,
        name: data.name,
        status: 1,
        image: url,
      });

      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateVeterinarian = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Veterinarian.update(
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

let deleteVeterinarian = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Veterinarian.update(
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
  getAllVeterinarian: getAllVeterinarian,
  getOne: getOne,
  getAll: getAll,
  createVeterinarian: createVeterinarian,
  updateVeterinarian: updateVeterinarian,
  deleteVeterinarian: deleteVeterinarian,
};
