const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.service_type.findAll({});
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.Service.findByPk(id);
      let data = await db.service_type.findOne({
        where: {
          service_type_id: id,
          // include: [{ model: ServiceType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createServiceType = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.service_type.create({
        service_type_id: id,
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

let updateServiceType = (id, req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.service_type.update(
        {
          name: req.body.name,
          status: req.status,
        },
        {
          where: {
            service_type_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteServiceType = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.service_type.update(
        {
          status: 0,
        },
        {
          where: {
            service_type_id: id,
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
  createServiceType: createServiceType,
  updateServiceType: updateServiceType,
  deleteServiceType: deleteServiceType,
};
