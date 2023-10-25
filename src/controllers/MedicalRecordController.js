const MedicalRecordService = require("../services/MedicalRecordService");
const MediaService = require("../services/MediaService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['MedicalRecord']
         #swagger.description = "Get all MedicalRecord  "
        */
    try {
      let data = await MedicalRecordService.getAll();

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
      // throw error;
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
      const {
        symptom,
        diagnose,
        recommendations,
        type,
        type_id,
        is_before,
        is_after,
        type_service,
      } = req.body;

      // const url = await Firebase.uploadImage(file);
      // let listImage = [];

      req.files.forEach(async (file) => {
        const url = await Firebase.uploadImage(file);
        await MediaService.createMedia(req.body, url);
        // listImage.push(url);
      });
      let data = await MedicalRecordService.createMedicalRecord(req.body);

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
    //   #swagger.tags = ['MedicalRecord']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const id = req.params["id"];
      const url = await Firebase.uploadImage(file);

      let data = await MedicalRecordService.updateMedicalRecord(id, url);
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
