const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Image.findAll();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createImage = (idcollection, idproduct, idfeedback, imageAddress) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = crypto.randomBytes(15).toString("hex");
      let data;
      idcollection.toString().length !== 0
        ? (data = await db.Image.create({
            idimage: id,
            idcollection: idcollection,
            urlImage: imageAddress,
          }))
        : idproduct.toString().length !== 0
        ? idfeedback.toString().length !== 0
          ? (data = await db.Image.create({
              idimage: id,
              idproduct: idproduct,
              idfeedback: idfeedback,
              urlImage: imageAddress,
            }))
          : (data = await db.Image.create({
              idimage: id,
              idproduct: idproduct,
              urlImage: imageAddress,
            }))
        : (data = await db.Image.create({
            idimage: id,

            urlImage: imageAddress,
          }));
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateImage = (id, urlImage) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Image.update(
        {
          urlImage: urlImage,
        },
        {
          where: {
            idimage: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteImage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Image.destroy({
        where: { idimage: id },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAll: getAll,
  createImage: createImage,
  updateImage: updateImage,
  deleteImage: deleteImage,
};
