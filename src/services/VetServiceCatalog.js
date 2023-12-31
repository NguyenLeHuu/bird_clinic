const { Op, col } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.vet_service_catalogs.findAll({
        where: {
          veterinarian_id: req.veterinarian_id,
        },
        attributes: ["service_id", "service_name"],
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
      // let data = await db.Veterinarian.findByPk(id);
      const data = await db.vet_service_catalogs.findOne({
        where: {
          vet_service_catalogs_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let create = (data) => {
  // let create = (data, image) => {

  return new Promise(async (resolve, reject) => {
    try {
      console.log("dâtt", data);
      let result;
      const id = crypto.randomBytes(15).toString("hex");
      try {
        result = await db.vet_service_catalogs.create({
          vet_service_catalog_id: id,
          veterinarian_id: data.veterinarian_id,
          service_id: data.service_id,
          veterinarian_name: data.veterinarian_name,
          service_name: data.service_name,
        });
      } catch (error) {
        console.error("Error in Sequelize query:", error);
      }

      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let update = (id, body_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.vet_service_catalogs.update(
        {
          veterinarian_id: body_data.veterinarian_id,
          service_id: body_data.service_id,
          veterinarian_name: body_data.veterinarian_name,
          service_name: body_data.service_name,
        },
        {
          where: {
            vet_service_catalog_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let dalete = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.vet_service_catalogs.update(
        {
          status: 0,
        },
        {
          where: {
            vet_service_catalog_id: id,
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
  getOne,
  getAll,
  create,
  update,
  dalete,
};
