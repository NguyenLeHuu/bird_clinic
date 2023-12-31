const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bird_breed.findAll({
        include: [
          {
            model: db.bird_size,
            attributes: ["size"],
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

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.Media.findByPk(id);
      let data = await db.bird_breed.findOne({
        where: {
          breed_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createBirdBreed = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");

      const result = await db.bird_breed.create({
        breed_id: id,
        bird_size_id: req.bird_size_id,
        breed: req.breed,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateBirdBreed = (id, req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bird_breed.update(
        {
          bird_size_id: req.bird_size_id,
          breed: req.breed,
        },
        {
          where: {
            breed_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBirdBreed = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bird_breed.update(
        {
          status: 0,
        },
        {
          where: {
            breed_id: id,
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
  createBirdBreed,
  updateBirdBreed,
  deleteBirdBreed,
};
