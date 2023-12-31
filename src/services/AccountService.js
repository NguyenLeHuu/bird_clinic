const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.account.findAll();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.Account.findByPk(id);
      let data = await db.account.findOne({
        where: {
          account_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.account.create({
        account_id: id,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
        status: data.status,
        name: data.name,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateAccount = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.account.update(
        {
          email: req.email,
          password: req.password,
          phone: req.phone,
          role: req.role,
          status: req.status,
          name: req.name,
        },
        {
          where: {
            account_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteAccount = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.account.update(
        {
          status: 0,
        },
        {
          where: {
            account_id: id,
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
  createAccount: createAccount,
  updateAccount: updateAccount,
  deleteAccount: deleteAccount,
};
