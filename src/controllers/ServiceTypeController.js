const ServiceType = require("../services/ServiceType");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['ServiceType']
         #swagger.description = "Get all ServiceType of service type"
        */
    try {
      // const id = req.params.id;
      let data = await ServiceType.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get ServiceType successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Not Found!",
          // data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get ServiceType");
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['ServiceType']
         #swagger.description = "Get one ServiceType (give service_id)"
        */
    try {
      const id = req.params.id;
      let data = await ServiceType.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get ServiceType successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "ServiceType not exist!",
          // data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get ServiceType", error);
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['ServiceType']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { name, status } = req.body;

      const url = await Firebase.uploadImage(file);
      let data = await ServiceType.createServiceType(req.body, url);
      //   let data = await ServiceType.createServiceType(req.body);

      console.log("____Create ServiceType Successful");

      return res.status(200).json({
        status: 200,
        message: "Create ServiceType Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create ServiceType Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['ServiceType']
         #swagger.description = "Update a ServiceType (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];
      const { name, status } = req.body;

      let data = await ServiceType.updateServiceType(id, req.body);
      console.log("____Update ServiceType Successful");

      return res.status(200).json({
        status: 200,
        message: "Update ServiceType Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update ServiceType Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['ServiceType']
         #swagger.description = "Delete ServiceType (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await ServiceType.deleteServiceType(id);
      console.log("____Delete ServiceType Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete ServiceType Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete ServiceType Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
