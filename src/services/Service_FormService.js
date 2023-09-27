const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (bird_size_id, service_form_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Service_Form.findAll({
        where: {
          [Op.or]: [
            { bird_size_id: bird_size_id },
            { service_form_id: service_form_id },
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
      // let data = await db.Service_Form.findByPk(id);
      let data = await db.Service_Form.findOne({
        where: {
          service_form_id: id,
          include: [{ model: Service_FormType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createService_Form = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.Service_Form.create({
        service_package_id: id,
        bird_size_id: data.bird_size_id,
        service_form_id: data.service_form_id,
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

let updateService_Form = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Service_Form.update(
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
