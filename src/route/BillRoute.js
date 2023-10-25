const promiseRouter = require("express-promise-router");
const BillController = require("../controllers/BillController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", BillController.getAll);

route.get("/:id", BillController.getOne);

// route.post("/", multer.Multer.array("image"), BillController.store);
route.post(
  "/",
  //  multer.Multer.single("image"),
  BillController.store
);

route.put("/:id", BillController.update);

route.delete("/:id", BillController.delete);
module.exports = route;
