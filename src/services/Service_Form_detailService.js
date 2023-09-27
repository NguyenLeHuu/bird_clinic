const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (bird_size_id, service_form_detail_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Service_Form_detail.findAll({
        where: {
          [Op.or]: [
            { bird_size_id: bird_size_id },
            { service_form_detail_id: service_form_detail_id },
          ],
        },
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
          include: [{ model: Service_Form_detailType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createService_Form_detail = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.Service_Form_detail.create({
        service_package_id: id,
        bird_size_id: data.bird_size_id,
        service_form_detail_id: data.service_form_detail_id,
        price: data.price,
        description: data.description,
        package_name: data.package_name,
        status: 1,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateService_Form_detail = (
  id,
  name,
  quantity,
  price,
  mainimg,
  detail
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Service_Form_detail.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          detail: detail,
        },
        {
          where: {
            account_id: id,
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
