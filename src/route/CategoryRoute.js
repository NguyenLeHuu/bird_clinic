const promiseRouter = require("express-promise-router");
const CategoryController = require("../controllers/CategoryController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route = promiseRouter();
route.get("/", CategoryController.index);

route.post("/", CategoryController.store);

route.put("/:id", CategoryController.update);

route.delete("/:id", CategoryController.delete);

module.exports = route;
