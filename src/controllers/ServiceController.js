const Service = require("../services/Service");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['service']
         #swagger.description = "Get all Service of service type"
        */
    try {
      // const id = req.params.id;
      let data = await Service.getAll();

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
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['service']
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
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['service']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['image'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { service_type_id, name, description, status } = req.body;
      let image =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD6eAt9MQh34xLtvsYSXlW2MUi0S0BrIRAAYqF95P4wtH_o40vJ0MloinFD6V6pjP_if0&usqp=CAU";
      if (req.file) {
        image = await Firebase.uploadImage(req.file);
      }
      let data = await Service.createService(req.body, image);

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
        #swagger.tags = ['service']
         #swagger.description = "Update a Service (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];
      const { service_type_id, name, description, status } = req.body;
      let data = await Service.updateService(id, req.body);
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
        #swagger.tags = ['service']
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
