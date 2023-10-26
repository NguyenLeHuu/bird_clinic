const promiseRouter = require("express-promise-router");
const VeterinarianSlotDetailController = require("../controllers/VeterinarianSlotDetailController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/", VeterinarianSlotDetailController.getAll);

route.get("/:id", VeterinarianSlotDetailController.getOne);
route.get(
  "/available/:time_slot_clinic_id",
  VeterinarianSlotDetailController.is_booking_available
);

// route.post("/", multer.Multer.array("image"), VeterinarianSlotDetailController.store);
route.post("/", VeterinarianSlotDetailController.store);

route.put("/:id", VeterinarianSlotDetailController.update);

route.delete("/:id", VeterinarianSlotDetailController.delete);
module.exports = route;
