const promiseRouter = require("express-promise-router");
const OrderController = require("../controllers/OrderController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route = promiseRouter();

route.get("/", OrderController.index);

route.get("/:customerid", OrderController.getbyCustomer);

route.post("/", OrderController.store);

route.put("/status/:orderid", OrderController.updateStatus);

route.put("/total/:orderid", OrderController.updateTotal);

module.exports = route;
