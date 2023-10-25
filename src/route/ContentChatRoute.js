const promiseRouter = require("express-promise-router");
const ContentChatController = require("../controllers/ContentChatController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", ContentChatController.getAll);

route.get("/:id", ContentChatController.getOne);

// route.post("/", multer.Multer.array("image"), ContentChatController.store);
route.post("/", ContentChatController.store);

route.put("/:id", ContentChatController.update);

route.delete("/:id", ContentChatController.delete);
module.exports = route;
