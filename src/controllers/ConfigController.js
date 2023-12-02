const ConfigService = require("../services/ConfigService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['config']
         #swagger.description = "Get all config"
        */
    try {
      let data = await ConfigService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get config successful!",
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
      console.log("____Cannot get config");
    }
  },

  // async getOne(req, res) {
  //   /*
  //       #swagger.tags = ['config']
  //        #swagger.description = "Get one config (give vet_id)"
  //       */
  //   try {
  //     const id = req.params.id;
  //     let data = await ConfigService.getOne(id);

  //     if (data != null) {
  //       return res.status(200).json({
  //         status: 200,
  //         message: "Get config successful!",
  //         data: data,
  //       });
  //     } else {
  //       return res.status(400).json({
  //         status: 400,
  //         message: "config not exist!",
  //         data: data,
  //       });
  //     }
  //   } catch (error) {
  //     console.log("____Cannot get config");
  //     // throw error;
  //   }
  // },

  async store(req, res) {
    // #swagger.tags = ['config']

    try {
      const { email, password, phone, role, status } = req.body;

      // const url = await Firebase.uploadImage(file);
      // let data = await ConfigService.createconfig(req.body, url);
      let data = await ConfigService.create(req.body);

      console.log("____Create config Successful");

      return res.status(200).json({
        status: 200,
        message: "Create config Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create config Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['config']
        
        */
    try {
      const { key, value } = req.query;

      let data = await ConfigService.update(req.query);
      console.log("____Update config Successful");

      return res.status(200).json({
        status: 200,
        message: "Update config Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update config Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['config']
         #swagger.description = "Delete config (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await ConfigService.dalete(id);
      console.log("____Delete config Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete config Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete config Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
