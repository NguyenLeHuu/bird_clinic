const { Op, where } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (bird_size_id, boarding_record_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.BoardingRecord.findAll({
        where: {
          [Op.or]: [
            { bird_size_id: bird_size_id },
            { boarding_record_id: boarding_record_id },
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
      // let data = await db.BoardingRecord.findByPk(id);
      let data = await db.BoardingRecord.findOne({
        where: {
          boarding_record_id: id,
          include: [{ model: BoardingRecordType, attributes: ["name"] }],
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createBoardingRecord = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.BoardingRecord.create({
        service_package_id: id,
        bird_size_id: data.bird_size_id,
        boarding_record_id: data.boarding_record_id,
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

let updateBoardingRecord = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.BoardingRecord.update(
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

let deleteBoardingRecord = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.BoardingRecord.update(
        {
          status: 0,
        },
        {
          where: {
            boarding_record_id: id,
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
  createBoardingRecord: createBoardingRecord,
  updateBoardingRecord: updateBoardingRecord,
  deleteBoardingRecord: deleteBoardingRecord,
};
