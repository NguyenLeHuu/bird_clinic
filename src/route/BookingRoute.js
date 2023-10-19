const promiseRouter = require("express-promise-router");
const BookingController = require("../controllers/BookingController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", BookingController.getAll);

route.get("/:id", BookingController.getOne);

// route.post("/", multer.Multer.array("image"), BookingController.store);
route.post("/create", BookingController.store);

route.put("/:id", BookingController.update);

route.delete("/:id", BookingController.delete);
module.exports = route;
