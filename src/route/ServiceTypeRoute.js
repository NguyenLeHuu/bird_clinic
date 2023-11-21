const promiseRouter = require("express-promise-router");
const ServiceTypeController = require("../controllers/ServiceTypeController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  ServiceTypeController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  ServiceTypeController.getOne
);

// route.post("/", multer.Multer.array("image"), ServiceTypeController.store);
route.post("/", multer.Multer.single("image"), ServiceTypeController.store);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  ServiceTypeController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  ServiceTypeController.delete
);
module.exports = route;
