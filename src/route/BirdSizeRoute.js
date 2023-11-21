const promiseRouter = require("express-promise-router");
const BirdSizeController = require("../controllers/BirdSizeController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", BirdSizeController.getAll);

route.get("/:id", BirdSizeController.getOne);

route.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  BirdSizeController.store
);
// route.post(
//   "/create",
//   multer.Multer.single("image"),
//   BirdSizeController.store
// );

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  BirdSizeController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  BirdSizeController.delete
);
module.exports = route;
