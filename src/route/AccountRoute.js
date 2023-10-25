const promiseRouter = require("express-promise-router");
const AccountController = require("../controllers/AccountController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", AccountController.getAll);

route.get("/:id", AccountController.getOne);

// route.post("/", multer.Multer.array("image"), AccountController.store);
route.post("/", multer.Multer.single("image"), AccountController.store);

route.put("/:id", AccountController.update);

route.delete("/:id", AccountController.delete);
module.exports = route;
