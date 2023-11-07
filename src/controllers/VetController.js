const VetService = require("../services/VetService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Vet']
         #swagger.description = "Get all Vet"
        */
    try {
      const { service_id, service_type_id } = req.query;
      let data = await VetService.getAll(req.query);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Vet successful!",
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
      console.log("____Cannot get Vet", error);
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Vet']
         #swagger.description = "Get one Vet (give vet_id)"
        */
    try {
      const id = req.params.id;
      let data = await VetService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Vet successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Vet not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Vet", error);
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Vet']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { account_id, specialized, name, status, image } = req.body;

      const url = await Firebase.uploadImage(file);
      let data = await VetService.createVeterinarian(req.body, url);

      console.log("____Create Vet Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Vet Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Vet Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Vet']
         #swagger.description = "Update a Vet (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      const { specialized, status } = req.body;

      let data = await VetService.updateVeterinarian(id, req.body);
      console.log("____Update Vet Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Vet Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Vet Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Vet']
         #swagger.description = "Delete Vet (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await VetService.deleteVeterinarian(id);
      console.log("____Delete Vet Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Vet Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Vet Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
