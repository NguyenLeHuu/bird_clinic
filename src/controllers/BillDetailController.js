const BillDetailService = require("../services/BillDetailService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['BillDetail']
         #swagger.description = "Get all BillDetail "
        */
    try {
      let data = await BillDetailService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get bill_detail successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Not Found!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get bill_detail", error);
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['BillDetail']
         #swagger.description = "Get one BillDetail (give bill_detail_id)"
        */
    try {
      const id = req.params.id;
      let data = await BillDetailService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get bill_detail successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "BillDetail not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get bill_detail");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['BillDetail']

    try {
      const { bill_id, service_package_id, price } = req.body;

      let data = await BillDetailService.createBillDetail(req.body);

      console.log("____Create BillDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Create BillDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create BillDetail Failed", err);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['BillDetail']
         #swagger.description = "Update a bill_detail (give bill_detail_id)"
        */
    try {
      const { bill_id, service_package_id, price } = req.body;

      let data = await BillDetailService.updateBillDetail(id, req.body);
      console.log("____Update BillDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Update BillDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update BillDetail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['BillDetail']
         #swagger.description = "Delete bill_detail (give bill_detail_id)"
        */
    try {
      const id = req.params["id"];

      let data = await BillDetailService.deleteBillDetail(id);
      console.log("____Delete BillDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete BillDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete BillDetail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
