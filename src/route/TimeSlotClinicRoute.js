const promiseRouter = require("express-promise-router");
const TimeSlotClinicController = require("../controllers/TimeSlotClinicController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route = promiseRouter();
const multer = require("multer");
const upload = multer();
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

route.post(
  "/with-file",
  // AuthMiddleware.isAuthenticated,
  // AuthMiddleware.isManager,
  upload.single("excelFile"),
  TimeSlotClinicController.storeWithFile
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
