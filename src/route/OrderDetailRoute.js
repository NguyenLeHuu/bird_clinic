const promiseRouter = require("express-promise-router");
const OrderDetailController = require("../controllers/OrderDetailController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route = promiseRouter();
route.get("/:orderid", OrderDetailController.index);

route.post("/", OrderDetailController.store);

route.put("/", OrderDetailController.update);

route.delete("/:id", OrderDetailController.delete);

module.exports = route;
