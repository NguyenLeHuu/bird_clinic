const db = require("../models/index");
const CustomerService = require("../services/CustomerService");
const VetService = require("../services/VetService");
const jwt = require("jsonwebtoken");
var refreshTokens = [];
module.exports = {
  async checkUserInDB(req, res) {
    /* 
        #swagger.tags = ['Login']
         #swagger.description = "return information of account if it exist in DB"
        */

    try {
      const { phone, password } = req.query;
      //   const password = req.params["password"];
      console.log("__checkUserInDB");
      let account = await db.account.findOne({
        where: {
          phone: phone,
          password: password,
        },
      });
      let data;
      if (account) {
        const accessToken = jwt.sign(
          { account_id: account.account_id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1000d",
          }
        );
        let role = account.role;
        switch (account.role) {
          case "customer":
            data = await CustomerService.getOne(account.account_id);
            break;
          case "vet":
            // data = await VetService.getOne(account.account_id);
            data = await db.veterinarian.findOne({
              where: {
                veterinarian_id: account.account_id,
              },
              include: [
                {
                  model: db.account,
                },
              ],
              raw: true,
              nest: true,
            });
            break;
          case "staff":
            data = account;
            break;
          default:
            break;
        }
        // console.log(data);
        res.status(200).json({
          status: 200,
          data: { role: role, data: data, accessToken },
        });
      } else {
        res.status(400).json({
          status: 400,
          message: "Not exist account",
        });
      }
    } catch (error) {
      console.log("___Problem when query DB____", error);
    }
  },
};
