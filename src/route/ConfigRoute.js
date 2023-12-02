const promiseRouter = require("express-promise-router");
const ConfigController = require("../controllers/ConfigController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  ConfigController.getAll
);

// route.get(
//   "/:id",
//   AuthMiddleware.isAuthenticated,
//   AuthMiddleware.isManager,
//   ConfigController.getOne
// );

// route.post(
//   "/",
//   // AuthMiddleware.isAuthenticated,
//   // AuthMiddleware.isManager,
//   ConfigController.store
// );

route.put(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  ConfigController.update
);

// route.delete(
//   "/:id",
//   // AuthMiddleware.isAuthenticated,
//   // AuthMiddleware.isManager,
//   ConfigController.delete
// );
module.exports = route;
