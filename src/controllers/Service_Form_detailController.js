const Service_Form_detailService = require("../services/Service_Form_detailService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Service_Form_detail']
         #swagger.description = "Get all Service_Form_detail of service"
        */
    try {
      const bird_size_id = req.query.size_id;
      const service_id = req.query.service_id;
      let data = await Service_Form_detail.getAll(bird_size_id, service_id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Service_Form_detail successful!",
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
      console.log("____Cannot get Service_Form_detail");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Service_Form_detail']
         #swagger.description = "Get one Service_Form_detail (give service_package_id)"
        */
    try {
      const id = req.params.id;
      let data = await Service_Form_detail.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Service_Form_detail successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Service_Form_detail not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Service_Form_detail");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Service_Form_detail']

    try {
      const {
        bird_size_id,
        service_id,
        price,
        description,
        package_name,
        status,
      } = req.body;

      //   const url = await Firebase.uploadImage(file);
      //   let data = await Service_Form_detail.createService_Form_detail(req.body, url);
      let data = await Service_Form_detail.createService_Form_detail(req.body);

      console.log("____Create Service_Form_detail Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Service_Form_detail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Service_Form_detail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Service_Form_detail']
         #swagger.description = "Update a Service_Form_detail (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await Service_Form_detail.updateService_Form_detail(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update Service_Form_detail Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Service_Form_detail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Service_Form_detail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Service_Form_detail']
         #swagger.description = "Delete Service_Form_detail (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await Service_Form_detail.deleteService_Form_detail(id);
      console.log("____Delete Service_Form_detail Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Service_Form_detail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Service_Form_detail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
