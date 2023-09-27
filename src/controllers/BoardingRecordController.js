const BoardingRecordService = require("../services/BoardingRecordService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['BoardingRecord']
         #swagger.description = "Get all BoardingRecord  "
        */
    try {
      const type = req.query.type;
      const type_id = req.query.type_id;
      let data = await BoardingRecordService.getAll(type, type_id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get BoardingRecord successful!",
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
      console.log("____Cannot get BoardingRecord");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['BoardingRecord']
         #swagger.description = "Get one BoardingRecord (give BoardingRecord_id)"
        */
    try {
      const id = req.params.id;
      let data = await BoardingRecordService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get BoardingRecord successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "BoardingRecord not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get BoardingRecord");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['BoardingRecord']
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
      let data = await BoardingRecordService.createBoardingRecord(
        req.body,
        url
      );

      console.log("____Create BoardingRecord Successful");

      return res.status(200).json({
        status: 200,
        message: "Create BoardingRecord Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create BoardingRecord Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['BoardingRecord']
         #swagger.description = "Update a BoardingRecord (give BoardingRecord_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await BoardingRecordService.updateBoardingRecord(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update BoardingRecord Successful");

      return res.status(200).json({
        status: 200,
        message: "Update BoardingRecord Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update BoardingRecord Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['BoardingRecord']
         #swagger.description = "Delete BoardingRecord (give BoardingRecord_id)"
        */
    try {
      const id = req.params["id"];

      let data = await BoardingRecordService.deleteBoardingRecord(id);
      console.log("____Delete BoardingRecord Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete BoardingRecord Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete BoardingRecord Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
