const promiseRouter = require("express-promise-router");
const TimeSlotClinicController = require("../controllers/TimeSlotClinicController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  TimeSlotClinicController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  TimeSlotClinicController.getOne
);

// route.post("/", multer.Multer.array("image"), TimeSlotClinicController.store);
route.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  TimeSlotClinicController.store
);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  TimeSlotClinicController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  TimeSlotClinicController.delete
);
module.exports = route;
