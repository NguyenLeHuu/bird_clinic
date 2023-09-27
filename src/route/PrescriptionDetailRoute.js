const promiseRouter = require("express-promise-router");
const PrescriptionDetailController = require("../controllers/PrescriptionDetailController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/all", PrescriptionDetailController.getAll);

route.get("/:id", PrescriptionDetailController.getOne);

// route.post("/", multer.Multer.array("image"), PrescriptionDetailController.store);
route.post("/create", PrescriptionDetailController.store);

route.put("/:id", PrescriptionDetailController.update);

route.delete("/:id", PrescriptionDetailController.delete);
module.exports = route;
