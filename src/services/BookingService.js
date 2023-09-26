const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Booking.findAll();
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
      let data = await db.Booking.findOne({
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
      const result = await db.Booking.create({
        booking_id: id,
        account_id: data.email,
        time_id: data.password,
        bird_id: data.phone,
        veterinarian_id: data.role,
        symptom: data.symptom,
        status: data.status,
        diagnosis: data.diagnosis,
        recommendations: data.recommendations,
        temperature: data.temperature,
        weight: data.weight,
        date: data.date,
        estimate_time: data.estimate_time,
        money_has_paid: data.money_has_paid,
        checkin_time: data.checkin_time,
        customer_name: data.customer_name,
        qr_code: data.qr_code,
        note: data.note,
        service_type: data.service_type,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateBooking = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Booking.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          detail: detail,
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

let deleteBooking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Booking.update(
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
