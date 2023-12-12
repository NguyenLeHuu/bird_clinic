const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data;
      let whereClause = {};
      if (req.veterinarian_id && !req.arrival_date) {
        // whereClause["veterinarian_id"] = req.veterinarian_id;
        data = await db.sequelize.query(
          `
          SELECT sfd.*, birds.name as bird_name, c.name as customer_name, c.phone
FROM service_form_details AS sfd
JOIN bookings AS b ON sfd.booking_id = b.booking_id
JOIN birds ON b.bird_id = birds.bird_id
JOIN customers AS c ON birds.customer_id = c.customer_id
WHERE sfd.veterinarian_id = :veterinarian_id
        `,
          {
            replacements: {
              veterinarian_id: req.veterinarian_id,
            },
            type: db.sequelize.QueryTypes.SELECT,
          }
        );
        resolve(data);
      }
      if (req.veterinarian_id && req.arrival_date) {
        data = await db.sequelize.query(
          `
          SELECT sfd.*, birds.name as bird_name, c.name as customer_name, c.phone
FROM service_form_details AS sfd
JOIN bookings AS b ON sfd.booking_id = b.booking_id
JOIN birds ON b.bird_id = birds.bird_id
JOIN customers AS c ON birds.customer_id = c.customer_id
WHERE b.arrival_date = :arrival_date
AND sfd.veterinarian_id = :veterinarian_id
        `,
          {
            replacements: {
              arrival_date: req.arrival_date,
              veterinarian_id: req.veterinarian_id,
            },
            type: db.sequelize.QueryTypes.SELECT,
          }
        );
        resolve(data);
      }
      if (req.booking_id && req.service_type_id) {
        let sp_id;
        if (req.service_type_id === "ST001") {
          sp_id = "SP1";
        }

        whereClause["booking_id"] = req.booking_id;
        whereClause["service_package_id"] = sp_id;
      }

      data = await db.service_form_detail.findAll({
        where: whereClause,
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
      let data = await db.service_form_detail.findOne({
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
      // const id = crypto.randomBytes(15).toString("hex");
      const id = `SFD_${crypto.randomBytes(5).toString("hex").toUpperCase()}`;
      const result = await db.service_form_detail.create({
        service_form_detail_id: id,
        service_package_id: data.service_package_id,
        service_form_id: data.service_form_id,
        note: data.note,
        status: data.status,
        veterinarian_id: data.veterinarian_id,
        booking_id: data.booking_id,
        process_at: data.process_at,
        checkin_time: data.checkin_time,
        price: data.price,
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
      let data = await db.service_form_detail.update(
        {
          status: body_data.status,
          veterinarian_id: body_data.veterinarian_id,
          process_at: body_data.process_at,
          checkin_time: body_data.checkin_time,
          price: body_data.price,
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
      let data = await db.service_form_detail.update(
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
