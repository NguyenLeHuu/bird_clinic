const promiseRouter = require("express-promise-router");
const ServiceController = require("../controllers/ServiceController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  ServiceController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  ServiceController.getOne
);

// route.post("/", multer.Multer.array("image"), ServiceController.store);
route.post("/", multer.Multer.single("image"), ServiceController.store);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  ServiceController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  ServiceController.delete
);
module.exports = route;
