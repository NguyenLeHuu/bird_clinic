const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (bird_size_id, service_form_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Service_Form.findAll({
        // where: {
        //   [Op.or]: [
        //     { bird_size_id: bird_size_id },
        //     { service_form_id: service_form_id },
        //   ],
        // },
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
      // let data = await db.Service_Form.findByPk(id);
      let data = await db.Service_Form.findOne({
        where: {
          service_form_id: id,
          // include: [{ model: Service_FormType, attributes: ["name"] }],
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
      const result = await db.Service_Form.create({
        service_form_id: id,
        bird_id: data.bird_id,
        booking_id: data.booking_id,
        reason_referral: data.reason_referral,
        status: 1,
        date: data.date,
        veterinarian_referral: data.veterinarian_referral,
        total_price: data.total_price,
        is_paid: data.is_paid,
        qr_code: data.qr_code,
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
      let data = await db.Service_Form.update(
        {
          bird_id: body_data.bird_id,
          booking_id: body_data.booking_id,
          reason_referral: body_data.reason_referral,
          status: body_data.status,
          date: body_data.date,
          veterinarian_referral: body_data.veterinarian_referral,
          total_price: body_data.total_price,
          is_paid: body_data.is_paid,
          qr_code: body_data.qr_code,
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
      let data = await db.Service_Form.update(
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
