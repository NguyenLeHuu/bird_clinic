const promiseRouter = require("express-promise-router");
const ServicePackageController = require("../controllers/ServicePackageController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  ServicePackageController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  ServicePackageController.getOne
);

// route.post("/", multer.Multer.array("image"), ServicePackageController.store);
route.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  ServicePackageController.store
);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  ServicePackageController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  ServicePackageController.delete
);
module.exports = route;
