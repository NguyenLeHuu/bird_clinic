const promiseRouter = require("express-promise-router");
const MediaController = require("../controllers/MediaController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/all", MediaController.getAll);

route.get("/:id", MediaController.getOne);

// route.post("/", multer.Multer.array("image"), MediaController.store);
route.post("/create", multer.Multer.single("image"), MediaController.store);

route.put("/:id", MediaController.update);

route.delete("/:id", MediaController.delete);
module.exports = route;
