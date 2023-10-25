const promiseRouter = require("express-promise-router");
const ChatController = require("../controllers/ChatController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", ChatController.getAll);

route.get("/:id", ChatController.getOne);

// route.post("/", multer.Multer.array("image"), ChatController.store);
route.post("/create", ChatController.store);

route.put("/:id", ChatController.update);

route.delete("/:id", ChatController.delete);
module.exports = route;