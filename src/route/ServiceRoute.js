const promiseRouter = require("express-promise-router");
const ServiceController = require("../controllers/ServiceController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/all", ServiceController.getAll);

route.get("/:id", ServiceController.getOne);

// route.post("/", multer.Multer.array("image"), ServiceController.store);
route.post("/create", multer.Multer.single("image"), ServiceController.store);

route.put("/:id", ServiceController.update);

route.delete("/:id", ServiceController.delete);
module.exports = route;
