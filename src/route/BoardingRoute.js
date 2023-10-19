const promiseRouter = require("express-promise-router");
const BoardingController = require("../controllers/BoardingController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", BoardingController.getAll);

route.get("/:id", BoardingController.getOne);

// route.post("/", multer.Multer.array("image"), BoardingController.store);
route.post("/create", BoardingController.store);

route.put("/:id", BoardingController.update);

route.delete("/:id", BoardingController.delete);
module.exports = route;
