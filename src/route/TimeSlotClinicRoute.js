const promiseRouter = require("express-promise-router");
const TimeSlotClinicController = require("../controllers/TimeSlotClinicController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", TimeSlotClinicController.getAll);

route.get("/:id", TimeSlotClinicController.getOne);

// route.post("/", multer.Multer.array("image"), TimeSlotClinicController.store);
route.post("/", TimeSlotClinicController.store);

route.put("/:id", TimeSlotClinicController.update);

route.delete("/:id", TimeSlotClinicController.delete);
module.exports = route;
