const promiseRouter = require("express-promise-router");
const CreatePayController = require("../controllers/CreatePayController");

let route =  promiseRouter();
route.post(
  "/",
  CreatePayController.create_pay
);

module.exports = route;