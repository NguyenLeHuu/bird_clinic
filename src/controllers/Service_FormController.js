const Service_FormService = require("../services/Service_FormService");
const Firebase = require("../services/Firebase");
const Service_Form_detail = require("../services/Service_Form_detailService");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Service_Form']
         #swagger.description = "Get all Service_Form of service"
        */
    try {
      let data = await Service_FormService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Service_Form successful!",
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
      console.log("____Cannot get Service_Form");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Service_Form']
         #swagger.description = "Get one Service_Form (give service_form_id)"
        */
    try {
      const id = req.params.id;
      let data = await Service_FormService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Service_Form successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Service_Form not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Service_Form");
      // throw error;
    }
  },

  async store(req, res) {
    /* 
        #swagger.tags = ['Service_Form']
         #swagger.description = "arr_service_pack optional truyền mảng"
        */

    try {
      const {
        bird_id,
        booking_id,
        reason_referral,
        status,
        date,
        veterinarian_referral,
        total_price,
        qr_code,
        num_ser_must_do,
        num_ser_has_done,

        arr_service_pack,
      } = req.body;

      let data = await Service_FormService.createService_Form(req.body);
      let temp = {};
      if (Array.isArray(arr_service_pack)) {
        arr_service_pack.forEach(async (item, index) => {
          // Thực hiện các thao tác với item ở đây
          temp = {
            ...data.dataValues,
            service_package_id: item.service_package_id,
            veterinarian_id: item.veterinarian_id,
            note: item.note,
            status: "pending",
            booking_id,
            process_at: 1,
          };
          // console.log(`Phần tử ${index}:`);
          // console.log(temp);
          // console.log("----------------------");
          await Service_Form_detail.createService_Form_detail(temp);
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Create Service_Form Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Service_Form Failed", err);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Service_Form']
         #swagger.description = "Update a Service_Form"
        */
    try {
      const id = req.params["id"];

      const { status, date, qr_code, num_ser_must_do, num_ser_has_done } =
        req.body;

      let data = await Service_FormService.updateService_Form(id, req.body);

      console.log("____Update Service_Form Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Service_Form Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Service_Form Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Service_Form']
         #swagger.description = "Delete Service_Form (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await Service_FormService.deleteService_Form(id);
      console.log("____Delete Service_Form Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Service_Form Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Service_FormService Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
