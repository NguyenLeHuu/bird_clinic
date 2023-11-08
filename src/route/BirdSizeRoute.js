const promiseRouter = require("express-promise-router");
const BirdSizeController = require("../controllers/BirdSizeController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", BirdSizeController.getAll);

route.get("/:id", BirdSizeController.getOne);

route.post("/", BirdSizeController.store);
// route.post(
//   "/create",
//   multer.Multer.single("image"),
//   BirdSizeController.store
// );

route.put("/:id", BirdSizeController.update);

route.delete("/:id", BirdSizeController.delete);
module.exports = route;
