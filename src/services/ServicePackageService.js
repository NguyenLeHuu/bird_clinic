const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (bird_size_id, service_type_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data;
      if (!bird_size_id && !service_type_id) {
        data = await db.service_package.findAll({});
      } else if (service_type_id && !bird_size_id) {
        data = await db.service_package.findAll({
          include: [
            {
              model: db.service,
              where: {
                service_type_id: service_type_id,
              },
              attributes: ["service_type_id"],
            },
          ],
          raw: true,
          nest: true,
        });
      } else if (service_type_id && bird_size_id) {
        data = await db.service_package.findAll({
          where: {
            bird_size_id: bird_size_id,
          },
          include: [
            {
              model: db.service,
              where: {
                service_type_id: service_type_id,
              },
              attributes: ["service_type_id"],
            },
          ],
          raw: true,
          nest: true,
        });
      } else if (!service_type_id && bird_size_id) {
        data = await db.service_package.findAll({
          where: {
            bird_size_id: bird_size_id,
          },
        });
      }

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.ServicePackage.findByPk(id);
      let data = await db.service_package.findOne({
        where: {
          service_package_id: id,
          // include: [{ model: ServicePackageType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createServicePackage = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.service_package.create({
        service_package_id: id,
        bird_size_id: data.bird_size_id,
        service_id: data.service_id,
        price: data.price,
        description: data.description,
        package_name: data.package_name,
        status: data.status,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateServicePackage = (
  id,
  name,
  quantity,
  price,
  mainimg,
  description
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.service_package.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          description: description,
        },
        {
          where: {
            service_package_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteServicePackage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.service_package.update(
        {
          status: 0,
        },
        {
          where: {
            service_package_id: id,
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
  createServicePackage: createServicePackage,
  updateServicePackage: updateServicePackage,
  deleteServicePackage: deleteServicePackage,
};
