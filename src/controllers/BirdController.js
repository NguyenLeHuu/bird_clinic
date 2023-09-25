const BirdService = require("../services/BirdService");
const Firebase = require("../services/Firebase");

module.exports = {
  // async index(req, res) {
  //   /*
  //       #swagger.tags = ['Bird']
  //        #swagger.description = "Filter bird, required idcollection"
  //       */
  //   try {
  //     // const { limit, page, name, catename, status, min, max } = req.query;
  //     const { limit, page, name, catename, status, min, max } = req.query;
  //     // console.log("_____", catename);
  //     let birds = await BirdService.getAll(req.query);

  //     return res.status(200).json({
  //       status: 200,
  //       message: "Get list birds successful!",
  //       data: birds,
  //     });
  //   } catch (error) {
  //     console.log("____Cannot get all birds");
  //   }
  // },

  async getAll(req, res) {
    /* 
        #swagger.tags = ['Bird']
         #swagger.description = "Get all Bird of 1 customer (give customerid)"
        */
    try {
      const id = req.params.id;
      let data = await BirdService.getAll(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get bird successful!",
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
      console.log("____Cannot get bird");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Bird']
         #swagger.description = "Get one Bird (give bird_id)"
        */
    try {
      const id = req.params.id;
      let data = await BirdService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get bird successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Bird not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get bird");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Bird']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const {
        customer_id,
        name,
        gender,
        hatching_date,
        ISO_microchip,
        weight,
        color,
        breed,
        status,
        image,
        size,
      } = req.body;

      const url = await Firebase.uploadImage(file);
      let data = await BirdService.createBird(req.body, url);

      console.log("____Create Bird Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Bird Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Bird Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Bird']
         #swagger.description = "Update a bird (give bird_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await BirdService.updateBird(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update Bird Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Bird Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Bird Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Bird']
         #swagger.description = "Delete bird (give bird_id)"
        */
    try {
      const id = req.params["id"];

      let data = await BirdService.deleteBird(id);
      console.log("____Delete Bird Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Bird Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Bird Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
