const promiseRouter = require("express-promise-router");
const BillDetailController = require("../controllers/BillDetailController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/all", BillDetailController.getAll);

route.get("/:id", BillDetailController.getOne);

// route.post("/", multer.Multer.array("image"), BillDetailController.store);
route.post(
  "/create",
  multer.Multer.single("image"),
  BillDetailController.store
);

route.put("/:id", BillDetailController.update);

route.delete("/:id", BillDetailController.delete);
module.exports = route;
