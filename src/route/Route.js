const express = require("express");

let router = express();

const loginRoute = require("./LoginRoute");
const accountRoute = require("./AccountRoute");
const customerRoute = require("./CustomerRoute");
const vetRoute = require("./VetRoute");
const birdRoute = require("./BirdRoute");
const serviceRoute = require("./ServiceRoute");
const servicePackageRoute = require("./ServicePackageRoute");
const mediaRoute = require("./MediaRoute");
const bookingRoute = require("./BookingRoute");
const prescriptionRoute = require("./PrescriptionRoute");
const prescriptionDetailRoute = require("./PrescriptionDetailRoute");
const veterinarianSlotDetailRoute = require("./VeterinarianSlotDetailRoute");
const service_FormRoute = require("./Service_FormRoute");
const service_Form_detailRoute = require("./Service_Form_detailRoute");

router.use("/login", loginRoute);
router.use("/account", accountRoute);
router.use("/customer", customerRoute);
router.use("/vet", vetRoute);
router.use("/bird", birdRoute);
router.use("/service", serviceRoute);
router.use("/servicePackage", servicePackageRoute);
router.use("/media", mediaRoute);
router.use("/booking", bookingRoute);
router.use("/prescription", prescriptionRoute);
router.use("/prescriptionDetail", prescriptionDetailRoute);
router.use("/veterinarianSlotDetail", veterinarianSlotDetailRoute);
router.use("/service_Form", service_FormRoute);
router.use("/service_Form_detail", service_Form_detailRoute);

module.exports = router;
