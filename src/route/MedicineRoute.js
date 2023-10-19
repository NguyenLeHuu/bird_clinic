const promiseRouter = require("express-promise-router");
const MedicineController = require("../controllers/MedicineController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", MedicineController.getAll);

route.get("/:id", MedicineController.getOne);

route.post("/", MedicineController.store);
// route.post(
//   "/create",
//   multer.Multer.single("image"),
//   MedicineController.store
// );

route.put("/:id", MedicineController.update);

route.delete("/:id", MedicineController.delete);
module.exports = route;
