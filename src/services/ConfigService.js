const { Op } = require("sequelize");
const db = require("../models/index");
const config_sys = require("../../config_sys");
const crypto = require("crypto");
const fs = require("fs");
let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(config_sys);
      const data = config_sys;
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

// let getOne = (id) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // let data = await db.Account.findByPk(id);
//       let data = await db.account.findOne({
//         where: {
//           account_id: id,
//         },
//       });
//       resolve(data);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.account.create({
        account_id: id,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
        status: 1,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let update = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (req.key && req.value) {
        console.log(req);

        if (config_sys.hasOwnProperty(req.key)) {
          config_sys[req.key] = parseInt(req.value);
        } else {
          reject(`Không tìm thấy trường ${req.key} trong config_sys.`);
        }

        fs.writeFileSync(
          "./config_sys.js",
          `const config_sys = ${JSON.stringify(
            config_sys,
            null,
            2
          )};\n\nmodule.exports = config_sys;`
        );
        resolve("Thay đổi thành công");
      } else {
        reject("truyền đủ zô");
      }
    } catch (e) {
      reject(e);
    }
  });
};

let dalete = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.account.update(
        {
          status: 0,
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

module.exports = {
  getAll: getAll,
  create,
  update,
  dalete,
};
