const Service_Form_detailService = require("../services/Service_Form_detailService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Service_Form_detail']
         #swagger.description = "Tuyền theo [veterinarian_id], [booking_id,service_type_id], []"
        */
    try {
      const { veterinarian_id, arrival_date, booking_id, service_type_id } =
        req.query;
      let data = await Service_Form_detailService.getAll(req.query);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Service_Form_detailService successful!",
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
      console.log("____Cannot get Service_Form_detailService", error);
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Service_Form_detail']
         #swagger.description = "Get one Service_Form_detailService (give service_package_id)"
        */
    try {
      const id = req.params.id;
      let data = await Service_Form_detailService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Service_Form_detailService successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Service_Form_detailService not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Service_Form_detailService");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Service_Form_detail']

    try {
      const {
        service_package_id,
        service_form_id,
        note,
        status,
        veterinarian_id,
        booking_id,
        process_at,
        checkin_time,
      } = req.body;

      //   const url = await Firebase.uploadImage(file);
      //   let data = await Service_Form_detailService.createService_Form_detailService(req.body, url);
      let data = await Service_Form_detailService.createService_Form_detail(
        req.body
      );

      console.log("____Create Service_Form_detailService Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Service_Form_detailService Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Service_Form_detailService Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Service_Form_detail']
         #swagger.description = "Update a Service_Form_detailService (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];
      const { status, veterinarian_id, process_at } = req.body;

      let data = await Service_Form_detailService.updateService_Form_detail(
        id,
        req.body
      );
      console.log("____Update Service_Form_detailService Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Service_Form_detailService Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Service_Form_detailService Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Service_Form_detail']
         #swagger.description = "Delete Service_Form_detailService (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await Service_Form_detailService.deleteService_Form_detail(id);
      console.log("____Delete Service_Form_detailService Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Service_Form_detailService Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Service_Form_detailService Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
