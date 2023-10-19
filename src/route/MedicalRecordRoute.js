const promiseRouter = require("express-promise-router");
const MedicalRecordController = require("../controllers/MedicalRecordController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/all", MedicalRecordController.getAll);

route.get("/:id", MedicalRecordController.getOne);

route.post("/", multer.Multer.array("image"), MedicalRecordController.store);
// route.post(
//   "/create",
//   multer.Multer.single("image"),
//   MedicalRecordController.store
// );

route.put("/:id", MedicalRecordController.update);

route.delete("/:id", MedicalRecordController.delete);
module.exports = route;
