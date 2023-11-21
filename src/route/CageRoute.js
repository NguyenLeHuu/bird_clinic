const promiseRouter = require("express-promise-router");
const CageController = require("../controllers/CageController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  CageController.getAll
);
route.get(
  "/schedule_cage",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  CageController.schedule_cage
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  CageController.getOne
);

// route.post("/", multer.Multer.array("image"), CageController.store);
route.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  CageController.store
);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  CageController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  CageController.delete
);
module.exports = route;
