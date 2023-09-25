const express = require("express");

let router = express();

const loginRoute = require("./LoginRoute");
const accountRoute = require("./AccountRoute");
const customerRoute = require("./CustomerRoute");
const vetRoute = require("./VetRoute");
const birdRoute = require("./BirdRoute");
const serviceRoute = require("./ServiceRoute");
const servicePackageRoute = require("./ServicePackageRoute");

router.use("/login", loginRoute);
router.use("/account", accountRoute);
router.use("/customer", customerRoute);
router.use("/vet", vetRoute);
router.use("/bird", birdRoute);
router.use("/service", serviceRoute);
router.use("/service", servicePackageRoute);

module.exports = router;
