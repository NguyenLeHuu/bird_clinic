const BirdBreedService = require("../services/BirdBreedService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['BirdBreed']
        
        */
    try {
      // const type = req.query.type;
      // const type_id = req.query.type_id;
      let data = await BirdBreedService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get BirdBreed successful!",
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
        #swagger.tags = ['BirdBreed']
         #swagger.description = "Get one BirdBreed (give BirdBreed_id)"
        */
    try {
      const id = req.params.id;
      let data = await BirdBreedService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get BirdBreed successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "BirdBreed not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get BirdBreed");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['BirdBreed']

    try {
      const { bird_size_id, breed } = req.body;

      let data = await BirdBreedService.createBirdBreed(req.body);

      console.log("____Create BirdBreed Successful");

      return res.status(200).json({
        status: 200,
        message: "Create BirdBreed Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create BirdBreed Failed", err);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    // #swagger.tags = ['BirdBreed']

    try {
      const id = req.params["id"];
      const { bird_size_id, breed } = req.body;

      let data = await BirdBreedService.updateBirdBreed(id, req.body);
      console.log("____Update BirdBreed Successful");

      return res.status(200).json({
        status: 200,
        message: "Update BirdBreed Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update BirdBreed Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['BirdBreed']
         #swagger.description = "Delete BirdBreed (give BirdBreed_id)"
        */
    try {
      const id = req.params["id"];

      let data = await BirdBreedService.deleteBirdBreed(id);
      console.log("____Delete BirdBreed Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete BirdBreed Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete BirdBreed Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
