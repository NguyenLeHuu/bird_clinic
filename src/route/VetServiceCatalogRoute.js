const promiseRouter = require("express-promise-router");
const VetServiceCatalogController = require("../controllers/VetServiceCatalogController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  VetServiceCatalogController.getAll
);

route.get("/:id", VetServiceCatalogController.getOne);

// route.post("/", multer.Multer.array("image"), VetServiceCatalogController.store);
route.post(
  "/",
  multer.Multer.single("image"),
  VetServiceCatalogController.store
);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  VetServiceCatalogController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  VetServiceCatalogController.delete
);
module.exports = route;
