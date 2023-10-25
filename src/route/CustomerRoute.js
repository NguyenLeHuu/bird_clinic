const promiseRouter = require("express-promise-router");
const CustomerController = require("../controllers/CustomerController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", CustomerController.getAll);

route.get("/:id", CustomerController.getOne);

// route.post("/", multer.Multer.array("image"), CustomerController.store);
route.post("/", multer.Multer.single("image"), CustomerController.store);

route.put("/:id", CustomerController.update);

route.delete("/:id", CustomerController.delete);
module.exports = route;
