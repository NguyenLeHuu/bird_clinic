const express = require("express");

let router = express();

const reservationRoute = require("./Reservation");
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
const medicalRecordRoute = require("./MedicalRecordRoute");
const billRoute = require("./BillRoute");
const billDetailRoute = require("./BillDetailRoute");
const boardingRoute = require("./BoardingRoute");
const boardingRecordRoute = require("./BoardingRecordRoute");
const cageRoute = require("./CageRoute");

router.use("/reservation", reservationRoute);
router.use("/bird", birdRoute);
router.use("/booking", bookingRoute);
router.use("/service_Form", service_FormRoute);
router.use("/bill", billRoute);
router.use("/service_Form_detail", service_Form_detailRoute);
router.use("/login", loginRoute);
router.use("/account", accountRoute);
router.use("/customer", customerRoute);
router.use("/vet", vetRoute);
router.use("/service", serviceRoute);
router.use("/servicePackage", servicePackageRoute);
router.use("/media", mediaRoute);
router.use("/prescription", prescriptionRoute);
router.use("/prescriptionDetail", prescriptionDetailRoute);
router.use("/veterinarianSlotDetail", veterinarianSlotDetailRoute);

router.use("/medicalRecord", medicalRecordRoute);

router.use("/billDetail", billDetailRoute);
router.use("/boarding", boardingRoute);
router.use("/boardingRecord", boardingRecordRoute);
router.use("/cage", cageRoute);

module.exports = router;
