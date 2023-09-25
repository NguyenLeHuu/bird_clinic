const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (bird_size_id, service_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Service.findAll({
        where: {
          [Op.or]: [{ bird_size_id: bird_size_id }, { service_id: service_id }],
        },
      });
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
      let data = await db.Service.findOne({
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
      const result = await db.Service.create({
        service_package_id: id,
        bird_size_id: data.bird_size_id,
        service_id: data.service_id,
        price: data.price,
        description: data.description,
        package_name: data.package_name,
        status: 1,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateService = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Service.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          detail: detail,
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

let deleteService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Service.update(
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
