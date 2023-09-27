const CageService = require("../services/CageService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Cage']
         #swagger.description = "Get all Cage  "
        */
    try {
      const type = req.query.type;
      const type_id = req.query.type_id;
      let data = await CageService.getAll(type, type_id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Cage successful!",
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
      console.log("____Cannot get Cage");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Cage']
         #swagger.description = "Get one Cage (give Cage_id)"
        */
    try {
      const id = req.params.id;
      let data = await CageService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Cage successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Cage not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Cage");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Cage']
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
      let data = await CageService.createCage(req.body, url);

      console.log("____Create Cage Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Cage Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Cage Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Cage']
         #swagger.description = "Update a Cage (give Cage_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await CageService.updateCage(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update Cage Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Cage Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Cage Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Cage']
         #swagger.description = "Delete Cage (give Cage_id)"
        */
    try {
      const id = req.params["id"];

      let data = await CageService.deleteCage(id);
      console.log("____Delete Cage Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Cage Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Cage Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
