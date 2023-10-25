const promiseRouter = require("express-promise-router");
const Service_FormController = require("../controllers/Service_FormController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", Service_FormController.getAll);

route.get("/:id", Service_FormController.getOne);

// route.post("/", multer.Multer.array("image"), Service_FormController.store);
route.post(
  "/",
  // multer.Multer.single("image"),
  Service_FormController.store
);

route.put("/:id", Service_FormController.update);

route.delete("/:id", Service_FormController.delete);
module.exports = route;
