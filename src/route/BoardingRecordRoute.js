const promiseRouter = require("express-promise-router");
const BoardingRecordController = require("../controllers/BoardingRecordController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/all", BoardingRecordController.getAll);

route.get("/:id", BoardingRecordController.getOne);

// route.post("/", multer.Multer.array("image"), BoardingRecordController.store);
route.post("/create", BoardingRecordController.store);

route.put("/:id", BoardingRecordController.update);

route.delete("/:id", BoardingRecordController.delete);
module.exports = route;
