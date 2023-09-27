const promiseRouter = require("express-promise-router");
const CageController = require("../controllers/CageController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/all", CageController.getAll);

route.get("/:id", CageController.getOne);

// route.post("/", multer.Multer.array("image"), CageController.store);
route.post("/create", CageController.store);

route.put("/:id", CageController.update);

route.delete("/:id", CageController.delete);
module.exports = route;
