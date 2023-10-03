const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (bird_size_id, service_form_detail_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Service_Form_detail.findAll({
        // where: {
        //   [Op.or]: [
        //     { bird_size_id: bird_size_id },
        //     { service_form_detail_id: service_form_detail_id },
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
      // let data = await db.Service_Form_detail.findByPk(id);
      let data = await db.Service_Form_detail.findOne({
        where: {
          service_form_detail_id: id,
          // include: [{ model: Service_Form_detailType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createService_Form_detail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.Service_Form_detail.create({
        service_form_detail_id: id,
        service_package_id: data.service_package_id,
        service_form_id: data.service_form_id,
        note: data.note,
        status: 1,
        veterinarian_id: data.veterinarian_id,
        price: data.price,
        quantity: data.quantity,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateService_Form_detail = (id, body_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Service_Form_detail.update(
        {
          service_form_detail_id: id,
          service_package_id: body_data.service_package_id,
          service_form_id: body_data.service_form_id,
          note: body_data.note,
          status: body_data.status,
          veterinarian_id: body_data.veterinarian_id,
          price: body_data.price,
          quantity: body_data.quantity,
        },
        {
          where: {
            service_form_detail_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteService_Form_detail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Service_Form_detail.update(
        {
          status: 0,
        },
        {
          where: {
            service_form_detail_id: id,
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
  createService_Form_detail: createService_Form_detail,
  updateService_Form_detail: updateService_Form_detail,
  deleteService_Form_detail: deleteService_Form_detail,
};
