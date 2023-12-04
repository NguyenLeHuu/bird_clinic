const BirdService = require("../services/BirdService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['bird']
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
        });
      }
    } catch (error) {
      console.log("____Cannot get bird");
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['bird']
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
      console.log("____Cannot get bird", error);
      // throw error;
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async store(req, res) {
    // #swagger.tags = ['bird']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['image'] = {
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
        // weight,
        color,
        breed_id,
        status,
      } = req.body;
      let image =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy_QPLISHeW6nHqBiEzRi7iMSlDv35C8cj1Q&usqp=CAU";
      if (req.file) {
        image = await Firebase.uploadImage(req.file);
      }
      console.log(image);
      let data = await BirdService.createBird(req.body, image);

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
        #swagger.tags = ['bird']
         #swagger.description = "Update a bird (give bird_id)"
        */
    try {
      const id = req.params["id"];
      const customer_id = req.body.customer_id;
      const name = req.body.name;
      const gender = req.body.gender;
      const hatching_date = req.body.hatching_date;
      const ISO_microchip = req.body.ISO_microchip;
      // const weight = req.body.weight;
      const color = req.body.color;
      const breed_id = req.body.breed_id;
      const status = req.body.status;
      // const image = req.body.image;
      const size = req.body.size;

      let data = await BirdService.updateBird(
        id,
        customer_id,
        name,
        gender,
        hatching_date,
        ISO_microchip,
        // weight,
        color,
        breed_id,
        status,
        // image,
        size
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
        #swagger.tags = ['bird']
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
