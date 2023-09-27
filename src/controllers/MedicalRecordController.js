const MedicalRecordService = require("../services/MedicalRecordService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['MedicalRecord']
         #swagger.description = "Get all MedicalRecord  "
        */
    try {
      const type = req.query.type;
      const type_id = req.query.type_id;
      let data = await MedicalRecordService.getAll(type, type_id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get MedicalRecord successful!",
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
      console.log("____Cannot get MedicalRecord");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['MedicalRecord']
         #swagger.description = "Get one MedicalRecord (give MedicalRecord_id)"
        */
    try {
      const id = req.params.id;
      let data = await MedicalRecordService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get MedicalRecord successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "MedicalRecord not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get MedicalRecord");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['MedicalRecord']
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
      let data = await MedicalRecordService.createMedicalRecord(req.body, url);

      console.log("____Create MedicalRecord Successful");

      return res.status(200).json({
        status: 200,
        message: "Create MedicalRecord Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create MedicalRecord Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['MedicalRecord']
         #swagger.description = "Update a MedicalRecord (give MedicalRecord_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await MedicalRecordService.updateMedicalRecord(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update MedicalRecord Successful");

      return res.status(200).json({
        status: 200,
        message: "Update MedicalRecord Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update MedicalRecord Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['MedicalRecord']
         #swagger.description = "Delete MedicalRecord (give MedicalRecord_id)"
        */
    try {
      const id = req.params["id"];

      let data = await MedicalRecordService.deleteMedicalRecord(id);
      console.log("____Delete MedicalRecord Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete MedicalRecord Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete MedicalRecord Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
