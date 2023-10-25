const promiseRouter = require("express-promise-router");
const BirdController = require("../controllers/BirdController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/all/:id", BirdController.getAll);

route.get("/:id", BirdController.getOne);

// route.post("/", multer.Multer.array("image"), BirdController.store);
route.post("/", multer.Multer.single("image"), BirdController.store);

route.put("/:id", BirdController.update);

route.delete("/:id", BirdController.delete);
module.exports = route;
