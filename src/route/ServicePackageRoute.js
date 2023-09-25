const promiseRouter = require("express-promise-router");
const ServicePackageController = require("../controllers/ServicePackageController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/all", ServicePackageController.getAll);

route.get("/:id", ServicePackageController.getOne);

// route.post("/", multer.Multer.array("image"), ServicePackageController.store);
route.post(
  "/create",
  multer.Multer.single("image"),
  ServicePackageController.store
);

route.put("/:id", ServicePackageController.update);

route.delete("/:id", ServicePackageController.delete);
module.exports = route;
