const promiseRouter = require("express-promise-router");
const CageController = require("../controllers/CageController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", CageController.getAll);
route.get("/schedule_cage", CageController.schedule_cage);

route.get("/:id", CageController.getOne);

// route.post("/", multer.Multer.array("image"), CageController.store);
route.post("/", CageController.store);

route.put("/:id", CageController.update);

route.delete("/:id", CageController.delete);
module.exports = route;
