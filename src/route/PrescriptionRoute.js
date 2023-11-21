const promiseRouter = require("express-promise-router");
const PrescriptionController = require("../controllers/PrescriptionController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  PrescriptionController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  PrescriptionController.getOne
);

// route.post("/", multer.Multer.array("image"), PrescriptionController.store);
route.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  PrescriptionController.store
);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  PrescriptionController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  PrescriptionController.delete
);
module.exports = route;
