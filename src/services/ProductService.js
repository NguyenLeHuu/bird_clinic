const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findAll({
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

      let products = await db.Product.findAll({
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
      // let data = await db.Product.findByPk(id);
      let data = await db.Product.findAll({
        where: {
          productid: id,
        },
        include: {
          model: db.Image,
          // attributes: [
          //   "image",
          // ],
          group: "productid",
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

let createProduct = (data, listImage) => {
  // let createProduct = (data, image) => {

  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.Product.create({
        productid: id,
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        status: 1,
        cateid: data.cateid,
        detail: data.detail,
        mainimg:
          "https://cdn.shopify.com/s/files/1/0034/8759/6579/files/Black_large_logo.png?height=628&pad_color=fff&v=1614328540&width=1200&fbclid=IwAR2mUhBNanKugkGMIUThYS_9gCYlHaSyayw8Mc6KKKBQKox_CbOQlaoX7BM ",
      });

      await db.Product.update(
        {
          mainimg: listImage[0],
        },
        {
          where: {
            productid: id,
          },
        }
      );

      listImage.shift();

      listImage.forEach(async (element) => {
        // const idimage = crypto.randomBytes(15).toString("hex");
        await db.Image.create({
          // idimage: idimage,
          image: element,
          productid: id,
        });
      });

      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateProduct = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.update(
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

let deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.update(
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
  getAllProduct: getAllProduct,
  getOne: getOne,
  getAll: getAll,
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
