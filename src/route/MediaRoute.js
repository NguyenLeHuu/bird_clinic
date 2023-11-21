const promiseRouter = require("express-promise-router");
const MediaController = require("../controllers/MediaController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  MediaController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  MediaController.getOne
);

// route.post("/", multer.Multer.array("image"), MediaController.store);
route.post("/", multer.Multer.single("image"), MediaController.store);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  MediaController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  MediaController.delete
);
module.exports = route;
