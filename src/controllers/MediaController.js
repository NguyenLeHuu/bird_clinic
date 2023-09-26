const MediaService = require("../services/MediaService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Media']
         #swagger.description = "Get all Media  "
        */
    try {
      const type = req.query.type;
      const type_id = req.query.type_id;
      let data = await MediaService.getAll(type, type_id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Media successful!",
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
      console.log("____Cannot get Media");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Media']
         #swagger.description = "Get one Media (give Media_id)"
        */
    try {
      const id = req.params.id;
      let data = await MediaService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Media successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Media not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Media");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Media']
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
      let data = await MediaService.createMedia(req.body, url);

      console.log("____Create Media Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Media Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Media Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Media']
         #swagger.description = "Update a Media (give Media_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await MediaService.updateMedia(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update Media Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Media Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Media Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Media']
         #swagger.description = "Delete Media (give Media_id)"
        */
    try {
      const id = req.params["id"];

      let data = await MediaService.deleteMedia(id);
      console.log("____Delete Media Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Media Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Media Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
