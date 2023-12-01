const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.service.findAll({});
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
      let data = await db.service.findOne({
        where: {
          service_id: id,
          include: [{ model: ServiceType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createService = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.service.create({
        service_id: id,
        service_type_id: data.service_type_id,
        name: data.name,
        description: data.description,
        status: 1,
        image: url,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateService = (id, req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.service.update(
        {
          service_type_id: req.service_type_id,
          name: req.name,
          description: req.description,
          status: req.status,
        },
        {
          where: {
            service_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.service.update(
        {
          status: 0,
        },
        {
          where: {
            service_id: id,
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
  createService: createService,
  updateService: updateService,
  deleteService: deleteService,
};
