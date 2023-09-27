const promiseRouter = require("express-promise-router");
const PrescriptionController = require("../controllers/PrescriptionController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/all", PrescriptionController.getAll);

route.get("/:id", PrescriptionController.getOne);

// route.post("/", multer.Multer.array("image"), PrescriptionController.store);
route.post("/create", PrescriptionController.store);

route.put("/:id", PrescriptionController.update);

route.delete("/:id", PrescriptionController.delete);
module.exports = route;
