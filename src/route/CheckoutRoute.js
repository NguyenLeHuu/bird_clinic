const promiseRouter = require("express-promise-router");
const CheckoutNoMoneyController = require("../controllers/CheckoutController");

let route = promiseRouter();


route.post("/", CheckoutNoMoneyController.checkout);



module.exports = route;


