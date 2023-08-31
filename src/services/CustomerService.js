const db = require("../models/index");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Customer.findAll();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let searchByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Customer.findOne({ where: { name: name } });
      resolve(data);
      if (data === null) {
        console.log("________(searchCustomer)Not found!");
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createCustomer = (uid, name, email, phone, image, address) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Customer.create({
        customerid: uid,
        name: name,
        phone: phone,
        email: email,
        image: image,
        address: address,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAll: getAll,
  createCustomer: createCustomer,
  searchByName: searchByName,
};
