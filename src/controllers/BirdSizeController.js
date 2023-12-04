const BirdSizeService = require("../services/BirdSizeService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['bird_size']
        
        */
    try {
      // const type = req.query.type;
      // const type_id = req.query.type_id;
      let data = await BirdSizeService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get BirdSize successful!",
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
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['bird_size']
         #swagger.description = "Get one BirdSize (give BirdSize_id)"
        */
    try {
      const id = req.params.id;
      let data = await BirdSizeService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get BirdSize successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "BirdSize not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get BirdSize");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['bird_size']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { size, breeds } = req.body;

      let data = await BirdSizeService.createBirdSize(req.body);

      console.log("____Create BirdSize Successful");

      return res.status(200).json({
        status: 200,
        message: "Create BirdSize Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create BirdSize Failed", err);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    // #swagger.tags = ['bird_size']

    try {
      const id = req.params["id"];
      const { size, breeds } = req.body;

      let data = await BirdSizeService.updateBirdSize(id, req.body);
      console.log("____Update BirdSize Successful");

      return res.status(200).json({
        status: 200,
        message: "Update BirdSize Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update BirdSize Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['bird_size']
         #swagger.description = "Delete BirdSize (give BirdSize_id)"
        */
    try {
      const id = req.params["id"];

      let data = await BirdSizeService.deleteBirdSize(id);
      console.log("____Delete BirdSize Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete BirdSize Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete BirdSize Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
