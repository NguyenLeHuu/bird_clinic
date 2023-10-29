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
const medicineRoute = require("./MedicineRoute");
const billRoute = require("./BillRoute");
const billDetailRoute = require("./BillDetailRoute");
const boardingRoute = require("./BoardingRoute");
const chatRoute = require("./ChatRoute");
const content_chatRoute = require("./ContentChatRoute");
const cageRoute = require("./CageRoute");
const time_slot_clinicRoute = require("./TimeSlotClinicRoute");
const slot_clinicRoute = require("./SlotClinicRoute");

// router.use("/test", reservationRoute);
router.use("/booking", bookingRoute);
router.use("/service_Form", service_FormRoute);
router.use("/service_Form_detail", service_Form_detailRoute);
router.use("/bill", billRoute);
router.use("/billDetail", billDetailRoute);

router.use("/medicine", medicineRoute);
router.use("/medicalRecord", medicalRecordRoute);
router.use("/media", mediaRoute);
router.use("/prescription", prescriptionRoute);
router.use("/prescriptionDetail", prescriptionDetailRoute);

router.use("/boarding", boardingRoute);
router.use("/chat", chatRoute);
router.use("/content_chat", content_chatRoute);
router.use("/cage", cageRoute);

router.use("/service", serviceRoute);
router.use("/servicePackage", servicePackageRoute);

router.use("/login", loginRoute);
router.use("/account", accountRoute);
router.use("/customer", customerRoute);
router.use("/bird", birdRoute);
router.use("/vet", vetRoute);
router.use("/veterinarianSlotDetail", veterinarianSlotDetailRoute);

router.use("/time_slot_clinic", time_slot_clinicRoute);
router.use("/slot_clinic", slot_clinicRoute);

module.exports = router;
