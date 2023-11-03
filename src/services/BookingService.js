const { Op, col } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");
const utils = require("./Utils");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      const whereClause = {};

      if (req.arrival_date) whereClause.arrival_date = req.arrival_date;
      if (req.status) whereClause.status = req.status;
      if (req.account_id) whereClause.account_id = req.account_id;

      data = await db.booking.findAll({
        where: whereClause,
        include: [
          {
            model: db.veterinarian,
            attributes: ["name"],
          },
          {
            model: db.bird,
            attributes: ["name"],
          },
        ],

        raw: true,
        nest: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id, req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sp_id;

      let result;
      if (!req.service_type_id) {
        result = await db.booking.findOne({
          where: {
            booking_id: id,
          },
        });
      } else {
        if (req.service_type_id === "ST001") {
          sp_id = "SP1";
        }
        if (req.service_type_id === "ST002") {
          sp_id = "SP9";
        }
        if (req.service_type_id === "ST003") {
          sp_id = "SP10";
        }
        result = await db.sequelize.query(
          `
          SELECT bookings.*, service_form_details.process_at
          FROM bookings
          LEFT JOIN service_form_details
          ON bookings.booking_id = service_form_details.booking_id
          WHERE bookings.booking_id = :id AND service_form_details.service_package_id = :spid
        `,
          {
            replacements: { id: id, spid: sp_id },
            type: db.sequelize.QueryTypes.SELECT,
          }
        );
      }

      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let createBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("______", data.veterinarian_id);
      const id = crypto.randomBytes(15).toString("hex");
      const date = utils.getCurDay();

      const result = await db.booking.create({
        booking_id: id,
        account_id: data.account_id,
        time_id: data.time_id,
        bird_id: data.bird_id,
        veterinarian_id: data.veterinarian_id,
        symptom: data.symptom,
        status: data.status,
        // diagnosis: data.diagnosis,
        // recommendations: data.recommendations,
        booking_date: date,
        estimate_time: data.estimate_time,
        money_has_paid: data.money_has_paid,
        // checkin_time: data.checkin_time,
        customer_name: data.customer_name,
        // qr_code: data.qr_code,
        note: data.note,
        service_type: data.service_type,
        arrival_date: data.arrival_date,
        service_type_id: data.service_type_id,
        is_re_exam: data.is_re_exam,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateBooking = (id, body_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.booking.update(
        {
          // account_id,
          time_id: body_data.time_id,
          // bird_id,
          veterinarian_id: body_data.veterinarian_id,
          symptom: body_data.symptom,
          status: body_data.status,
          diagnosis: body_data.diagnosis,
          recommendations: body_data.recommendations,

          booking_date: body_data.date,
          estimate_time: body_data.estimate_time,
          money_has_paid: body_data.money_has_paid,
          // checkin_time,
          // customer_name,
          qr_code: body_data.qr_code,
          note: body_data.note,
          // service_type,
          arrival_date: body_data.arrival_date,
        },
        {
          where: {
            booking_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

let deleteBooking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.booking.update(
        {
          status: 0,
        },
        {
          where: {
            booking_id: id,
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
  createBooking: createBooking,
  updateBooking: updateBooking,
  deleteBooking: deleteBooking,
};
