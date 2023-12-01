const promiseRouter = require("express-promise-router");
const VeterinarianSlotDetailController = require("../controllers/VeterinarianSlotDetailController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route = promiseRouter();
const multer = require("multer");
const upload = multer();
route.get(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  VeterinarianSlotDetailController.getAll
);

route.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  VeterinarianSlotDetailController.getOne
);
route.get(
  "/available/:time_slot_clinic_id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.userOfSystem,
  VeterinarianSlotDetailController.is_booking_available
);

// route.post("/", multer.Multer.array("image"), VeterinarianSlotDetailController.store);
route.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  VeterinarianSlotDetailController.store
);

route.post(
  "/with-file",
  // AuthMiddleware.isAuthenticated,
  // AuthMiddleware.isManager,
  upload.single("excelFile"),
  VeterinarianSlotDetailController.storeWithFile
);

route.put(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isPersonOfClinic,
  VeterinarianSlotDetailController.update
);

route.delete(
  "/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isManager,
  VeterinarianSlotDetailController.delete
);
module.exports = route;
