const promiseRouter = require("express-promise-router");
const VetController = require("../controllers/VetController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  VetController.getAll
);

route.get("/:id", VetController.getOne);

// route.post("/", multer.Multer.array("image"), VetController.store);
route.post("/", multer.Multer.single("image"), VetController.store);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  VetController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  VetController.delete
);
module.exports = route;
