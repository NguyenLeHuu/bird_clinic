const db = require("../models/index");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Saler.findAll();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let searchByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Saler.findOne({ where: { name: name } });
      resolve(data);
      if (data === null) {
        console.log("________(searchSaler)Not found!");
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createSaler = (uid, name, email, phone, picture) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Saler.create({
        salerid: uid,
        name: name,
        email: email,
        phone: phone,
        address: address,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getProductBySaler = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findAll({
        attributes: [
          "productid",
          "name",
          "quantity",
          "price",
          "status",
          "detail",
          "mainimg",
        ],
        include: [
          {
            model: db.Category,
            attributes: ["cateid", "catename"],
            include: [
              {
                model: db.Saler,
                attributes: ["salerid", "name"],
              },
            ],
          },
        ],
        where: [{ salerid: id }],
        raw: false,
        nest: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let registerSaler = (name, email, username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Saler.create({
        salerid: "SALER_" + Math.floor(Math.random() * 100),
        name: name,
        email: email,
        username: username,
        password: password,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAll: getAll,
  createSaler: createSaler,
  searchByName: searchByName,
  getProductBySaler: getProductBySaler,
  registerSaler: registerSaler,
};
