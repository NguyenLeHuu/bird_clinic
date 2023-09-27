const PrescriptionDetailService = require("../services/PrescriptionDetailService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Prescription Detail']
         #swagger.description = "Get all Prescription"
        */
    try {
      let data = await PrescriptionDetailService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Prescription successful!",
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
      console.log("____Cannot get Prescription");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Prescription Detail']
         #swagger.description = "Get one Prescription (give prescription_id)"
        */
    try {
      const id = req.params.id;
      let data = await PrescriptionDetailService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Prescription successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Prescription not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Prescription");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Prescription Detail']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { email, password, phone, role, status } = req.body;

      // const url = await Firebase.uploadImage(file);
      // let data = await PrescriptionDetailService.createPrescription(req.body, url);
      let data = await PrescriptionDetailService.createPrescription(req.body);

      console.log("____Create Prescription Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Prescription Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Prescription Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Prescription Detail']
         #swagger.description = "Update a Prescription (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await PrescriptionDetailService.updatePrescription(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update Prescription Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Prescription Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Prescription Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Prescription Detail']
         #swagger.description = "Delete Prescription (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await PrescriptionDetailService.deletePrescription(id);
      console.log("____Delete Prescription Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Prescription Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Prescription Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
