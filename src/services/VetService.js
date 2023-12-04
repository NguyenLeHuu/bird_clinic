const { Op, col } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      if (req.service_id) {
        data = await db.veterinarian.findAll({
          include: [
            {
              model: db.vet_service_catalogs,
              attributes: ["service_id"],
              where: {
                service_id: req.service_id,
              },
            },
          ],
          raw: false,
          nest: true,
        });
      } else if (req.service_type_id) {
        data = await db.veterinarian.findAll({
          where: {
            service_type_id: req.service_type_id,
          },
        });
      } else {
        data = await db.veterinarian.findAll({
          include: [
            {
              model: db.account,
              attributes: ["status"],
            },
            {
              model: db.vet_service_catalogs,
              attributes: ["service_name"],
            },
          ],
          raw: false,
          nest: true,
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
      // let data = await db.Veterinarian.findByPk(id);
      const data = await db.veterinarian.findOne({
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

let createVeterinarian = (data, image) => {
  // let createVeterinarian = (data, image) => {

  return new Promise(async (resolve, reject) => {
    try {
      // const id = crypto.randomBytes(15).toString("hex");
      const result = await db.veterinarian.create({
        veterinarian_id: data.account_id,
        account_id: data.account_id,
        specialized: data.specialized,
        name: data.name,
        status: data.status,
        image: image,
        service_type_id: data.service_type_id,
        is_primary: data.is_primary,
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
      let data = await db.veterinarian.update(
        {
          specialized: body_data.specialized,
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
      let data = await db.veterinarian.update(
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
