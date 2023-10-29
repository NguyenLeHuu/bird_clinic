const promiseRouter = require("express-promise-router");
const ServiceTypeController = require("../controllers/ServiceTypeController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", ServiceTypeController.getAll);

route.get("/:id", ServiceTypeController.getOne);

// route.post("/", multer.Multer.array("image"), ServiceTypeController.store);
route.post("/", multer.Multer.single("image"), ServiceTypeController.store);

route.put("/:id", ServiceTypeController.update);

route.delete("/:id", ServiceTypeController.delete);
module.exports = route;
