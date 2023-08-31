const promiseRouter = require("express-promise-router");
const SignUpController = require("../controllers/SignUpController");


let route =  promiseRouter();
route.post("/",SignUpController.SignUp);

module.exports = route;