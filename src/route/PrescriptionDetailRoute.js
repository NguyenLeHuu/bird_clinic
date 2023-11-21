const promiseRouter = require("express-promise-router");
const PrescriptionDetailController = require("../controllers/PrescriptionDetailController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  PrescriptionDetailController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  PrescriptionDetailController.getOne
);

// route.post("/", multer.Multer.array("image"), PrescriptionDetailController.store);
route.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  PrescriptionDetailController.store
);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  PrescriptionDetailController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  PrescriptionDetailController.delete
);
module.exports = route;
