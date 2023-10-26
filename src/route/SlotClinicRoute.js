const promiseRouter = require("express-promise-router");
const SlotClinicController = require("../controllers/SlotClinicController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", SlotClinicController.getAll);

route.get("/:id", SlotClinicController.getOne);

// route.post("/", multer.Multer.array("image"), SlotClinicController.store);
route.post("/", SlotClinicController.store);

route.put("/:id", SlotClinicController.update);

route.delete("/:id", SlotClinicController.delete);
module.exports = route;
