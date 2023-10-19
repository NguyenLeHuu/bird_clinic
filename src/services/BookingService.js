const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");
const utils = require("./Utils");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      let whereClause = {};
      if (req.arrival_date && req.status) {
        whereClause["arrival_date"] = req.arrival_date;
        whereClause["status"] = req.status;
      } else {
        if (req.arrival_date) {
          whereClause["arrival_date"] = req.arrival_date;
        } else if (req.status) {
          whereClause["status"] = req.status;
        }
      }
      data = await db.booking.findAll({ where: whereClause });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.Booking.findByPk(id);
      let data = await db.booking.findOne({
        where: {
          booking_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
        diagnosis: data.diagnosis,
        recommendations: data.recommendations,
        booking_date: date,
        estimate_time: data.estimate_time,
        money_has_paid: data.money_has_paid,
        checkin_time: data.checkin_time,
        customer_name: data.customer_name,
        qr_code: data.qr_code,
        note: data.note,
        service_type: data.service_type,
        arrival_date: data.arrival_date,
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
