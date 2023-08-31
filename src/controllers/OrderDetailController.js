const { RedshiftData } = require("aws-sdk");
const OrderDetailService = require("../services/OrderDetailService");
const redis = require("../services/redis");

module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['OrderDetail']
         #swagger.description = "Get order details by order id"
        */
    try {
      const id = req.params["orderid"];
      let data = await OrderDetailService.getAll(id);

      return res.status(200).json({
        status: 200,
        message: "Get detail by order id successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Cannot get detail by order id");
    }
  },

  async getOrderDetail(req, res) {
    /* 
        #swagger.tags = ['OrderDetail']
         #swagger.description = "Get order details by id"
        */
    try {
      const orderdetailid = req.params["orderdetailid"];
      let data = await OrderDetailService.getOrderDetail(orderdetailid);

      return res.status(200).json({
        status: 200,
        message: "Get detail by id successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Cannot get detail by id");
      return res;
    }
  },

  async store(req, res) {
    /* 
        #swagger.tags = ['OrderDetail']
         #swagger.description = "Create new OrderDetail"
        */
    try {
      const quantity = req.body.quantity;
      const orderid = req.body.orderid;
      const productid = req.body.productid;
      const salerid = req.body.salerid;
      let data = await OrderDetailService.addOrderDetail(
        orderid,
        productid,
        quantity,
        salerid
      );
      console.log("____Add OrderDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Add OrderDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Add OrderDetail Failed");
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['OrderDetail']
         #swagger.description = "Update a OrderDetail"
        */
    try {
      const quantity = req.body.quantity;
      const orderdetailid = req.body.orderdetailid;

      let data = await OrderDetailService.updateOrderDetail(
        orderdetailid,
        quantity
      );
      console.log("____Update OrderDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Update OrderDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update OrderDetail Failed");
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['OrderDetail']
         #swagger.description = "Delete OrderDetail by orderdetailid"
        */
    try {
      const id = req.params["id"];

      let data = await OrderDetailService.deleteOrderDetail(id);
      console.log("____Delete OrderDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete OrderDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete OrderDetail Failed");
    }
  },
};
