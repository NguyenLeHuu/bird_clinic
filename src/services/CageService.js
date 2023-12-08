const { Op, where, col } = require("sequelize");

const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data;
      if (req.size && req.status) {
        data = await db.cage.findAll({
          attributes: ["cage_id", "boarding_id", "bird_id", "status", "size"],
          where: {
            [Op.and]: [{ status: req.status }, { size: req.size }],
          },
          include: [
            {
              model: db.bird_size,
              attributes: ["size"],
            },
          ],
          raw: false,
          nest: true,
        });
      } else if (!req.size && !req.status) {
        data = await db.cage.findAll({
          attributes: ["cage_id", "boarding_id", "bird_id", "status", "size"],
          include: [
            {
              model: db.bird_size,
              attributes: ["size"],
            },
          ],
          raw: false,
          nest: true,
        });
      } else {
        if (!req.size) {
          req.size = "%";
        }
        if (!req.status) {
          req.status = "%";
        }
        data = await db.cage.findAll({
          attributes: ["cage_id", "boarding_id", "bird_id", "status", "size"],
          where: {
            [Op.or]: [{ status: req.status }, { size: req.size }],
          },
          include: [
            {
              model: db.bird_size,
              attributes: ["size"],
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
      // let data = await db.Cage.findByPk(id);
      let data = await db.sequelize.query(
        `
        SELECT c.*, b.customer_id
FROM cages c
LEFT JOIN birds b ON c.bird_id = b.bird_id
WHERE c.cage_id = :cage_id;

      `,
        {
          replacements: {
            cage_id: id,
          },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createCage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const id = crypto.randomBytes(15).toString("hex");
      const result = await db.cage.create({
        boarding_id: data.boarding_id,
        bird_id: data.bird_id,
        status: "empty",
        size: data.size,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateCage = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.cage.update(
        {
          boarding_id: data.boarding_id,
          bird_id: data.bird_id,
          status: data.status,
        },
        {
          where: {
            cage_id: id,
          },
        }
      );
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.cage.update(
        {
          status: 0,
        },
        {
          where: {
            cage_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let schedule_cage = (start_date, end_date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const results1 = await db.sequelize.query(
        `
            SELECT
      c.*,
      b.act_arrival_date ,
      b.act_departure_date,
      b.arrival_date ,
      b.departure_date
           FROM cages c
      LEFT JOIN boardings b ON c.boarding_id = b.boarding_id
      WHERE c.status = 'not_empty';
          `,
        // WHERE c.status = 'un_available';
        {
          // replacements: { id: id, spid: sp_id },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      let mark_start, mark_end;
      const modifiedResults = results1.map((cage) => {
        mark_start = cage.act_arrival_date
          ? cage.act_arrival_date
          : cage.arrival_date;
        mark_end = cage.act_departure_date
          ? cage.act_departure_date
          : cage.departure_date;
        if (mark_start <= start_date) {
          mark_start = start_date;
        }
        if (mark_end >= end_date) {
          mark_end = end_date;
        }
        const modifiedCage = {
          ...cage, // Sao chép tất cả các trường từ cage
          mark_start,
          mark_end,
        };

        return modifiedCage;
      });

      resolve(modifiedResults);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAll: getAll,
  getOne: getOne,
  createCage: createCage,
  updateCage: updateCage,
  deleteCage: deleteCage,
  schedule_cage,
};
