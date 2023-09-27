const BoardingService = require("../services/BoardingService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Boarding']
         #swagger.description = "Get all Boarding  "
        */
    try {
      const type = req.query.type;
      const type_id = req.query.type_id;
      let data = await BoardingService.getAll(type, type_id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Boarding successful!",
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
      console.log("____Cannot get Boarding");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Boarding']
         #swagger.description = "Get one Boarding (give Boarding_id)"
        */
    try {
      const id = req.params.id;
      let data = await BoardingService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Boarding successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Boarding not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Boarding");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Boarding']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { type, type_id, link, is_before, is_after, type_service, status } =
        req.body;

      const url = await Firebase.uploadImage(file);
      let data = await BoardingService.createBoarding(req.body, url);

      console.log("____Create Boarding Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Boarding Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Boarding Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Boarding']
         #swagger.description = "Update a Boarding (give Boarding_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await BoardingService.updateBoarding(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update Boarding Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Boarding Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Boarding Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Boarding']
         #swagger.description = "Delete Boarding (give Boarding_id)"
        */
    try {
      const id = req.params["id"];

      let data = await BoardingService.deleteBoarding(id);
      console.log("____Delete Boarding Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Boarding Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Boarding Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
