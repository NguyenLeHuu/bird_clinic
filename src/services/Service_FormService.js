const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.service_form.findAll({});
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.service_form.findOne({
        where: {
          service_form_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createService_Form = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.service_form.create({
        service_form_id: id,
        bird_id: data.bird_id,
        booking_id: data.booking_id,
        reason_referral: data.reason_referral,
        status: data.status,
        date: data.date,
        veterinarian_referral: data.veterinarian_referral,
        total_price: data.total_price,
        // is_paid: data.is_paid,
        qr_code: data.qr_code,
        num_ser_must_do: data.num_ser_must_do,
        num_ser_has_done: data.num_ser_has_done,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateService_Form = (id, body_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.service_form.update(
        {
          status: body_data.status,
          date: body_data.date,
          qr_code: body_data.qr_code,
          num_ser_must_do: body_data.num_ser_must_do,
          num_ser_has_done: body_data.num_ser_has_done,
        },
        {
          where: {
            service_form_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteService_Form = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.service_form.update(
        {
          status: 0,
        },
        {
          where: {
            service_form_id: id,
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
  createService_Form: createService_Form,
  updateService_Form: updateService_Form,
  deleteService_Form: deleteService_Form,
};
