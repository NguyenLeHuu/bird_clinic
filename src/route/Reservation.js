const promiseRouter = require("express-promise-router");
const ReservationController = require("../controllers/ReservationController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", ReservationController.test);
// route.get("/all", ReservationController.getAll);

// route.get("/:id", ReservationController.getOne);

// route.post("/", multer.Multer.array("image"), ReservationController.store);
// route.post("/", ReservationController.store);
// route.post("/boarding", ReservationController.store_boarding);

// route.put("/:id", ReservationController.update);

// route.delete("/:id", ReservationController.delete);
module.exports = route;
