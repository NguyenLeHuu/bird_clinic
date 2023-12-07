const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data;
      if (req.booking_id) {
        data = await db.service_form.findAll({
          where: {
            booking_id: req.booking_id,
          },
          include: [
            {
              model: db.booking,
              attributes: ["customer_name", "service_type_id"],
            },
            {
              model: db.service_form_detail,

              include: [
                {
                  model: db.service_package,
                  attributes: ["price", "package_name"], // Chỉ định các trường bạn muốn bao gồm
                },
              ],
            },
            {
              model: db.bill,
              attributes: ["payment_method"],
            },
          ],
          order: [["time_create", "DESC"]],
          raw: false,
          nest: true,
        });
      } else if (req.date) {
        data = await db.service_form.findAll({
          where: {
            date: req.date,
          },
          include: [
            {
              model: db.booking,
              attributes: ["customer_name", "service_type_id"],
            },
            {
              model: db.service_form_detail,

              include: [
                {
                  model: db.service_package,
                  attributes: ["price", "package_name"], // Chỉ định các trường bạn muốn bao gồm
                },
              ],
            },
            {
              model: db.bill,
              attributes: ["payment_method"],
            },
          ],
          order: [["time_create", "DESC"]],
          raw: false,
          nest: true,
        });
      } else {
        data = await db.service_form.findAll({
          include: [
            {
              model: db.booking,
              attributes: ["customer_name", "service_type_id"],
              where: {
                service_type_id: { [Op.ne]: "ST003" },
              },
            },
            {
              model: db.service_form_detail,

              include: [
                {
                  model: db.service_package,
                  attributes: ["price", "package_name"], // Chỉ định các trường bạn muốn bao gồm
                },
              ],
            },
          ],
          order: [["time_create", "DESC"]],
          raw: false,
          nest: true,
        });
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllForBoarding = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data;
      if (req.booking_id) {
        data = await db.service_form.findAll({
          where: {
            booking_id: req.booking_id,
          },
          include: [
            {
              model: db.booking,
              attributes: ["customer_name", "service_type_id"],
            },
            {
              model: db.service_form_detail,

              include: [
                {
                  model: db.service_package,
                  attributes: ["price", "package_name"], // Chỉ định các trường bạn muốn bao gồm
                },
              ],
            },
          ],
          order: [["time_create", "DESC"]],
          raw: false,
          nest: true,
        });
      } else {
        data = await db.service_form.findAll({
          include: [
            {
              model: db.booking,
              attributes: ["customer_name", "service_type_id"],
              where: {
                service_type_id: "ST003",
              },
            },
            {
              model: db.service_form_detail,

              include: [
                {
                  model: db.service_package,
                  attributes: ["price", "package_name"], // Chỉ định các trường bạn muốn bao gồm
                },
              ],
            },
          ],
          order: [["time_create", "DESC"]],
          raw: false,
          nest: true,
        });
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
      let data = await db.service_form.findAll({
        where: {
          service_form_id: id,
        },
        include: [
          {
            model: db.service_form_detail,
            include: [
              {
                model: db.service_package,
                attributes: ["price", "package_name"], // Chỉ định các trường bạn muốn bao gồm
              },
              {
                model: db.veterinarian,
                attributes: ["name"],
              },
            ],
          },
          {
            model: db.bill,
            attributes: ["payment_method"],
          },
        ],
        raw: false,
        nest: true,
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
      // const id = crypto.randomBytes(15).toString("hex");
      const id = `SF_${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
      const result = await db.service_form.create({
        service_form_id: id,
        bird_id: data.bird_id,
        booking_id: data.booking_id,
        reason_referral: data.reason_referral,
        status: data.status,
        date: data.date,
        veterinarian_referral: data.veterinarian_referral,
        total_price: data.total_price,
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
  getAllForBoarding,
  getOne: getOne,
  createService_Form: createService_Form,
  updateService_Form: updateService_Form,
  deleteService_Form: deleteService_Form,
};
