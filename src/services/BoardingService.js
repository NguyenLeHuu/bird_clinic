const { Op, col, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data;
      if (req.booking_id) {
        data = await db.sequelize.query(
          `SELECT boardings.*, bird_sizes.size
          FROM boardings
          JOIN cages ON boardings.cage_id = cages.cage_id JOIN bird_sizes ON cages.size = bird_sizes.bird_size_id
          WHERE boardings.booking_id = :booking_id;
          `,
          {
            replacements: { booking_id: req.booking_id },
            type: db.sequelize.QueryTypes.SELECT,
          }
        );
      } else {
        data = await db.boarding.findAll({});
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
      // let data = await db.Boarding.findByPk(id);
      let data = await db.boarding.findOne({
        where: {
          boarding_id: id,
        },
        include: [{ model: db.chat, attributes: ["chat_id", "customer_id"] }],
        raw: true,
        nest: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createBoarding = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const id = crypto.randomBytes(15).toString("hex");
      const result = await db.boarding.create({
        boarding_id: data.booking_id,
        booking_id: data.booking_id,
        arrival_date: data.arrival_date,
        departure_date: data.departure_date,
        room_type: data.room_type,
        bird_id: data.bird_id,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateBoarding = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.boarding.update(
        {
          arrival_date: data.arrival_date,
          departure_date: data.departure_date,
          room_type: data.room_type,
          act_arrival_date: data.act_arrival_date,
          act_departure_date: data.act_departure_date,
          cage_id: data.cage_id,
        },
        {
          where: {
            boarding_id: id,
          },
        }
      );
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBoarding = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.boarding.update(
        {
          status: 0,
        },
        {
          where: {
            boarding_id: id,
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
  createBoarding: createBoarding,
  updateBoarding: updateBoarding,
  deleteBoarding: deleteBoarding,
};
