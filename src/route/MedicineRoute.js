const promiseRouter = require("express-promise-router");
const MedicineController = require("../controllers/MedicineController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  MedicineController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  MedicineController.getOne
);

route.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  MedicineController.store
);
// route.post(
//   "/create",
//   multer.Multer.single("image"),
//   MedicineController.store
// );

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  MedicineController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  MedicineController.delete
);
module.exports = route;
