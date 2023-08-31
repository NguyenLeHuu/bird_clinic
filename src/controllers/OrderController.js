const { RedshiftData } = require("aws-sdk");
const OrderService = require("../services/OrderService");
const redis = require("../services/redis");
const OrderDetailService = require("../services/OrderDetailService");
const crypto = require("crypto");

module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['Order/Cart']
         #swagger.description = "Get all order "
        */
    try {
      let data = await OrderService.getAll();

      return res.status(200).json({
        status: 200,
        message: "Get list order/cart by  successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Cannot get order cart by");
    }
  },
  async getbyCustomer(req, res) {
    /* 
        #swagger.tags = ['Order/Cart']
         #swagger.description = "Get all order by customer id"
        */
    try {
      const id = req.params["customerid"];
      let data = await OrderService.getByCustomer(id);

      return res.status(200).json({
        status: 200,
        message: "Get list order/cart by customer id successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Cannot get order cart by customer id");
    }
  },

  async store(req, res) {
    //create empty cart when customer sign in
    /* 
        #swagger.tags = ['Order/Cart']
         #swagger.description = "Create empty Cart"
        */
    try {
      const customerid = req.body.customerid;
      const id = crypto.randomBytes(15).toString("hex");
      let result_1 = await OrderService.createOrder(id, customerid);
      console.log("____Create Empty Cart Successful");

      // if (result_1 != null && result_1 != "") {
      //   products.map(async function (item_cart) {
      //     await OrderDetailService.addOrderDetail(id, item_cart);
      //   });
      // }

      return res.status(200).json({
        status: 200,
        message: "Create Order Successful!",
        data: result_1,
      });
    } catch (err) {
      console.log("____Create Order Failed: ");
    }
  },

  async updateStatus(req, res) {
    /* 
        #swagger.tags = ['Order/Cart']
         #swagger.description = "Update status by orderid
         status: cart, pending_cast, pending_banking , done, canceled "
        */
    try {
      const orderid = req.params["orderid"];
      const tracking = req.body.tracking;

      let data = await OrderService.updateOrderStatus(orderid, tracking);
      console.log("____Update Order Tracking Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Order Tracking Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Tracking Failed");
    }
  },

  async updateTotal(req, res) {
    //khi nao dat hang moi update
    /* 
        #swagger.tags = ['Order/Cart']
         #swagger.description = "Update total money order --khi nao dat hang nho goi ham nay"
        */
    try {
      const orderid = req.params["orderid"];
      const totalmoney = req.body.totalmoney;

      let data = await OrderService.updateCartTotal(orderid, totalmoney);
      console.log("____Update cart total Successful");

      return res.status(200).json({
        status: 200,
        message: "Update cart total Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update cart total Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
