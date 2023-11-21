const promiseRouter = require("express-promise-router");
const MedicalRecordController = require("../controllers/MedicalRecordController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  MedicalRecordController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  MedicalRecordController.getOne
);

route.post("/", multer.Multer.array("image"), MedicalRecordController.store);
// route.post(
//   "/create",
//   multer.Multer.single("image"),
//   MedicalRecordController.store
// );

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  MedicalRecordController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  MedicalRecordController.delete
);
module.exports = route;
