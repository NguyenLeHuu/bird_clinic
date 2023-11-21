const promiseRouter = require("express-promise-router");
const BookingController = require("../controllers/BookingController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BookingController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BookingController.getOne
);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BookingController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BookingController.delete
);

// route.post("/", multer.Multer.array("image"), BookingController.store);
route.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BookingController.store
);
route.post(
  "/re_exam",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  BookingController.store_re_exam
);
module.exports = route;
