const promiseRouter = require("express-promise-router");
const Service_Form_detailController = require("../controllers/Service_Form_detailController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/all", Service_Form_detailController.getAll);

route.get("/:id", Service_Form_detailController.getOne);

// route.post("/", multer.Multer.array("image"), Service_Form_detailController.store);
route.post(
  "/create",
  // multer.Multer.single("image"),
  Service_Form_detailController.store
);

route.put("/:id", Service_Form_detailController.update);

route.delete("/:id", Service_Form_detailController.delete);
module.exports = route;
