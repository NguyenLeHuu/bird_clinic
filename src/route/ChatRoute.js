const promiseRouter = require("express-promise-router");
const ChatController = require("../controllers/ChatController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  ChatController.getAll
);

route.get("/:id", ChatController.getOne);

// route.post("/", multer.Multer.array("image"), ChatController.store);
route.post("/", ChatController.store);

route.put("/:id", ChatController.update);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  ChatController.delete
);
module.exports = route;
