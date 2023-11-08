const { Op, col } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      if (req.service_id) {
        data = await db.veterinarians.findAll({
          where: {
            service_id: req.service_id,
          },
        });
      } else if (req.service_type_id) {
        data = await db.veterinarians.findAll({
          include: [
            {
              model: db.services,
              attributes: [],
              where: {
                service_type_id: req.service_type_id,
              },
            },
          ],
          raw: true,
          nest: true,
        });
      } else {
        data = await db.veterinarians.findAll();
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
      // let data = await db.Veterinarian.findByPk(id);
      const data = await db.veterinarians.findOne({
        where: {
          veterinarian_id: id,
        },
        attributes: [
          "veterinarian_id",
          "account_id",
          "specialized",
          "name",
          "status",
          "image",
          "service_id",
          "service_name",
        ],
        include: [
          {
            model: db.veterinarian_slot_details,
            attributes: ["date"],
          },
        ],
        group: "date",
        raw: false,
        nest: true,
      });
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
      const result = await db.veterinarians.create({
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

let updateVeterinarian = (id, body_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.veterinarians.update(
        {
          specialized: body_data.specializedme,
          status: body_data.status,
        },
        {
          where: {
            veterinarian_id: id,
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
      let data = await db.veterinarians.update(
        {
          status: 0,
        },
        {
          where: {
            veterinarian_id: id,
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
  getOne: getOne,
  getAll: getAll,
  createVeterinarian: createVeterinarian,
  updateVeterinarian: updateVeterinarian,
  deleteVeterinarian: deleteVeterinarian,
};
