const promiseRouter = require("express-promise-router");
const BirdBreedController = require("../controllers/BirdBreedController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BirdBreedController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BirdBreedController.getOne
);

route.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  BirdBreedController.store
);
// route.post(
//   "/create",
//   multer.Multer.single("image"),
//   BirdBreedController.store
// );

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BirdBreedController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  BirdBreedController.delete
);
module.exports = route;
