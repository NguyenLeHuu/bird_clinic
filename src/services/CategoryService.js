const db = require("../models/index");
const crypto = require("crypto");
const Utils = require("./Utils");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Category.findAll({});
      Utils.setStatus(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createCategory = (name, salerid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Category.create({
        catename: name,
        salerid: salerid,
        status: 1,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateCategory = (id, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Category.update(
        {
          catename: name,
        },
        {
          where: {
            cateid: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Category.update(
        {
          status: 0,
        },
        {
          where: {
            cateid: id,
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
  createCategory: createCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
};
