const promiseRouter = require("express-promise-router");
const BirdController = require("../controllers/BirdController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/all/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BirdController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BirdController.getOne
);

// route.post("/", multer.Multer.array("image"), BirdController.store);
route.post("/", multer.Multer.single("image"), BirdController.store);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BirdController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isCustomer,
  BirdController.delete
);
module.exports = route;
