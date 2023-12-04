const promiseRouter = require("express-promise-router");
const AccountController = require("../controllers/AccountController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  AccountController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  AccountController.getOne
);

// route.post("/", multer.Multer.array("image"), AccountController.store);
route.post("/", AccountController.store);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  AccountController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  AccountController.delete
);
module.exports = route;
