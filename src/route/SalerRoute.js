const promiseRouter = require("express-promise-router");
const SalerController = require("../controllers/SalerController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/:salerid", SalerController.getProductBySaler);

route.post("/register", SalerController.registerSaler);

route.post("/login", SalerController.loginSaler);

module.exports = route;
