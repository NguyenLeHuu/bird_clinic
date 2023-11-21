const promiseRouter = require("express-promise-router");
const SlotClinicController = require("../controllers/SlotClinicController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  SlotClinicController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  SlotClinicController.getOne
);

// route.post("/", multer.Multer.array("image"), SlotClinicController.store);
route.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  SlotClinicController.store
);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  SlotClinicController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  SlotClinicController.delete
);
module.exports = route;
