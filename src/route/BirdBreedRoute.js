const promiseRouter = require("express-promise-router");
const BirdBreedController = require("../controllers/BirdBreedController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", BirdBreedController.getAll);

route.get("/:id", BirdBreedController.getOne);

route.post("/", BirdBreedController.store);
// route.post(
//   "/create",
//   multer.Multer.single("image"),
//   BirdBreedController.store
// );

route.put("/:id", BirdBreedController.update);

route.delete("/:id", BirdBreedController.delete);
module.exports = route;
