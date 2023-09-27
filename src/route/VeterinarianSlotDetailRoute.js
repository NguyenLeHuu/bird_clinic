const promiseRouter = require("express-promise-router");
const VeterinarianSlotDetailController = require("../controllers/VeterinarianSlotDetailController");
// const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("../middleware/GetImgMiddleware");

let route = promiseRouter();

route.get("/all", VeterinarianSlotDetailController.getAll);

route.get("/:id", VeterinarianSlotDetailController.getOne);

// route.post("/", multer.Multer.array("image"), VeterinarianSlotDetailController.store);
route.post("/create", VeterinarianSlotDetailController.store);

route.put("/:id", VeterinarianSlotDetailController.update);

route.delete("/:id", VeterinarianSlotDetailController.delete);
module.exports = route;
