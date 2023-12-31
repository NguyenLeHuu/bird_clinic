const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bird.findAll({
        where: {
          customer_id: id,
        },
        include: [
          {
            model: db.bird_breed,
            attributes: ["breed"],
            include: [
              {
                model: db.bird_size,
                attributes: ["size"],
              },
            ],
          },
        ],
        raw: true,
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
      // let data = await db.Bird.findByPk(id);
      let data = await db.bird.findOne({
        where: {
          bird_id: id,
        },
        include: [
          {
            model: db.bird_breed,
            attributes: ["breed"],
            include: [
              {
                model: db.bird_size,
                attributes: ["size"],
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createBird = (data, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.bird.create({
        bird_id: id,
        customer_id: data.customer_id,
        name: data.name,
        gender: data.gender,
        hatching_date: data.hatching_date,
        ISO_microchip: data.ISO_microchip,
        // weight: data.weight,
        color: data.color,
        breed_id: data.breed_id,
        status: 1,
        image: url,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateBird = (
  id,
  customer_id,
  name,
  gender,
  hatching_date,
  ISO_microchip,
  // weight,
  color,
  breed_id,
  status,
  // image,
  size
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bird.update(
        {
          customer_id: customer_id,
          gender: gender,
          name: name,
          hatching_date: hatching_date,
          ISO_microchip: ISO_microchip,
          // weight: weight,
          color: color,
          breed_id: breed_id,
          status: status,
          // image: image,
          size: size,
        },
        {
          where: {
            bird_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBird = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.bird.update(
        {
          status: 0,
        },
        {
          where: {
            bird_id: id,
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
  createBird: createBird,
  updateBird: updateBird,
  deleteBird: deleteBird,
};
