const promiseRouter = require("express-promise-router");
const LoginController = require('../controllers/LoginController')

let route =  promiseRouter();

route.post("/", LoginController.checkUserAccount)
.post("/refreshToken", LoginController.refreshToken);

module.exports = route;