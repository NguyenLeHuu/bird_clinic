const promiseRouter = require("express-promise-router");
const BoardingController = require("../controllers/BoardingController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BoardingController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BoardingController.getOne
);

// route.post("/", multer.Multer.array("image"), BoardingController.store);
route.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BoardingController.store
);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BoardingController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  BoardingController.delete
);
module.exports = route;
