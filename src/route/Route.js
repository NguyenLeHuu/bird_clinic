const express = require("express");

let router = express();

const reservationRoute = require("./Reservation");
const loginRoute = require("./LoginRoute");
const accountRoute = require("./AccountRoute");
const customerRoute = require("./CustomerRoute");
const vetRoute = require("./VetRoute");
const vetServiceCatalogRoute = require("./VetServiceCatalogRoute");
const birdRoute = require("./BirdRoute");
const birdSizeRoute = require("./BirdSizeRoute");
const birdBreedRoute = require("./BirdBreedRoute");
const serviceRoute = require("./ServiceRoute");
const serviceTypeRoute = require("./ServiceTypeRoute");
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
const configRoute = require("./ConfigRoute");

// router.use("/test", reservationRoute);
router.use("/booking", bookingRoute);
router.use("/service-form", service_FormRoute);
router.use("/service-form-detail", service_Form_detailRoute);
router.use("/bill", billRoute);
// router.use("/billDetail", billDetailRoute);

router.use("/medicine", medicineRoute);
router.use("/medical-record", medicalRecordRoute);
router.use("/media", mediaRoute);
router.use("/prescription", prescriptionRoute);
router.use("/prescription-detail", prescriptionDetailRoute);

router.use("/boarding", boardingRoute);
router.use("/chat", chatRoute);
router.use("/content-chat", content_chatRoute);
router.use("/cage", cageRoute);

router.use("/service-type", serviceTypeRoute);
router.use("/service", serviceRoute);
router.use("/service-package", servicePackageRoute);

router.use("/login", loginRoute);
router.use("/account", accountRoute);
router.use("/customer", customerRoute);
router.use("/bird", birdRoute);
router.use("/bird-size", birdSizeRoute);
router.use("/bird-breed", birdBreedRoute);
router.use("/vet", vetRoute);
router.use("/vet-service-catalog", vetServiceCatalogRoute);
router.use("/veterinarian-slot-detail", veterinarianSlotDetailRoute);

router.use("/time-slot-clinic", time_slot_clinicRoute);
router.use("/slot-clinic", slot_clinicRoute);
router.use("/config", configRoute);

module.exports = router;
