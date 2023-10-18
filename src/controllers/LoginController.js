const db = require("../models/index");
const CustomerService = require("../services/CustomerService");
const VetService = require("../services/VetService");

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
      if (account) {
        let role = account.role;
        switch (account.role) {
          case "customer":
            account = await CustomerService.getOne(account.account_id);
            break;
          case "doctor":
            account = await VetService.getOne(account.account_id);
            break;
          default:
            break;
        }
        console.log(account);
        res.status(200).json({
          status: 200,
          data: { role: role, account: account },
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
