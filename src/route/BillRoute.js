const promiseRouter = require("express-promise-router");
const BillController = require("../controllers/BillController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BillController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BillController.getOne
);
route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  BillController.update1
);

// route.post("/", multer.Multer.array("image"), BillController.store);
route.post(
  "/",
  //  multer.Multer.single("image"),
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BillController.store
);

// route.put("/:id", BillController.update);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  BillController.delete
);
module.exports = route;
