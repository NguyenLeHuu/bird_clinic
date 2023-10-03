const Service_FormService = require("../services/Service_FormService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Service_FormService']
         #swagger.description = "Get all Service_FormService of service"
        */
    try {
      const bird_size_id = req.query.size_id;
      const service_id = req.query.service_id;
      let data = await Service_FormService.getAll(bird_size_id, service_id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Service_FormService successful!",
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
      console.log("____Cannot get Service_FormService");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Service_FormService']
         #swagger.description = "Get one Service_FormService (give service_form_id)"
        */
    try {
      const id = req.params.id;
      let data = await Service_FormService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Service_FormService successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Service_FormService not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Service_FormService");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Service_FormService']

    try {
      const {
        bird_id,
        booking_id,
        reason_referral,
        status,
        date,
        veterinarian_referral,
        total_price,
        is_paid,
        qr_code,
      } = req.body;

      //   const url = await Firebase.uploadImage(file);
      //   let data = await Service_FormService.createService_FormService(req.body, url);
      let data = await Service_FormService.createService_Form(req.body);

      console.log("____Create Service_FormService Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Service_FormService Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Service_FormService Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Service_FormService']
         #swagger.description = "Update a Service_FormService (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      const {
        bird_id,
        booking_id,
        reason_referral,
        status,
        date,
        veterinarian_referral,
        total_price,
        is_paid,
        qr_code,
      } = req.body;

      let data = await Service_FormService.updateService_Form(id, req.body);

      console.log("____Update Service_FormService Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Service_FormService Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Service_FormService Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Service_FormService']
         #swagger.description = "Delete Service_FormService (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await Service_FormService.deleteService_Form(id);
      console.log("____Delete Service_FormService Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Service_FormService Successful!",
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
