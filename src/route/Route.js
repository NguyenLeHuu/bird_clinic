const express = require("express");

let router = express();

// const signupRoute = require("./SignUpRoute");
const loginRoute = require("./LoginRoute");
// const categoryRoute = require("./CategoryRoute");
// const productRoute = require("./ProductRoute");
// const orderRoute = require("./OrderRoute");
// const orderDetailRoute = require("./OrderDetailRoute");
// const createPayRoute = require("./CreatePayRoute");
// const createPaySuccessRoute = require("./PaySuccessRoute");
// const createPayCancelRoute = require("./PayCancelRoute");
// const checkoutRoute = require("./CheckoutRoute");
// const salerRoute = require("./SalerRoute");

// router.use("/signup", signupRoute);
router.use("/login", loginRoute);
// router.use("/category", categoryRoute);
// router.use("/product", productRoute);
// router.use("/saler", salerRoute);
// router.use("/order", orderRoute);
// router.use("/orderdetail", orderDetailRoute);
// router.use("/pay", createPayRoute);
// router.use("/success", createPaySuccessRoute);
// router.use("/cancel", createPayCancelRoute);
// router.use("/checkout", checkoutRoute);

module.exports = router;
