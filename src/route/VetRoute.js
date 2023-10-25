const promiseRouter = require("express-promise-router");
const VetController = require("../controllers/VetController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", VetController.getAll);

route.get("/:id", VetController.getOne);

// route.post("/", multer.Multer.array("image"), VetController.store);
route.post("/", multer.Multer.single("image"), VetController.store);

route.put("/:id", VetController.update);

route.delete("/:id", VetController.delete);
module.exports = route;
