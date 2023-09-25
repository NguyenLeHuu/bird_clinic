const Service = require("../services/Service");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Service']
         #swagger.description = "Get all Service of service type"
        */
    try {
      const id = req.params.id;
      let data = await Service.getAll(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Service successful!",
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
      console.log("____Cannot get Service");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Service']
         #swagger.description = "Get one Service (give service_id)"
        */
    try {
      const id = req.params.id;
      let data = await Service.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Service successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Service not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Service");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Service']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { service_type_id, name, description, status } = req.body;

      const url = await Firebase.uploadImage(file);
      let data = await Service.createService(req.body, url);
      //   let data = await Service.createService(req.body);

      console.log("____Create Service Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Service Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Service Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Service']
         #swagger.description = "Update a Service (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await Service.updateService(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update Service Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Service Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Service Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Service']
         #swagger.description = "Delete Service (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await Service.deleteService(id);
      console.log("____Delete Service Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Service Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Service Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
