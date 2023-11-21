const promiseRouter = require("express-promise-router");
const BillDetailController = require("../controllers/BillDetailController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BillDetailController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BillDetailController.getOne
);

// route.post("/", multer.Multer.array("image"), BillDetailController.store);
route.post("/", multer.Multer.single("image"), BillDetailController.store);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  BillDetailController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  BillDetailController.delete
);
module.exports = route;
