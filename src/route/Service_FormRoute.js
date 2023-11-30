const promiseRouter = require("express-promise-router");
const Service_FormController = require("../controllers/Service_FormController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  Service_FormController.getAll
);

route.get(
  "/boarding",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  Service_FormController.getAllForBoarding
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  Service_FormController.getOne
);

// route.post("/", multer.Multer.array("image"), Service_FormController.store);
route.post(
  "/",
  // multer.Multer.single("image"),
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  Service_FormController.store
);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  Service_FormController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  Service_FormController.delete
);
module.exports = route;
