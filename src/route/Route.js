const express = require("express");

let router = express();

const loginRoute = require("./LoginRoute");
const customerRoute = require("./CustomerRoute");
const vetRoute = require("./VetRoute");
const birdRoute = require("./BirdRoute");

router.use("/login", loginRoute);
router.use("/login", customerRoute);
router.use("/login", vetRoute);
router.use("/bird", birdRoute);

module.exports = router;
