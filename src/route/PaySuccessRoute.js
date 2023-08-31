const promiseRouter = require("express-promise-router");
const PayController = require("../controllers/PayController");

let route =  promiseRouter();
route.get(
  "/",
  PayController.pay
);

module.exports = route;