const promiseRouter = require("express-promise-router");
const LoginController = require("../controllers/LoginController");

let route = promiseRouter();

route.post("/", LoginController.checkUserInDB);

module.exports = route;
