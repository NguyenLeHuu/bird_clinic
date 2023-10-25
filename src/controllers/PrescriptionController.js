const PrescriptionService = require("../services/PrescriptionService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Prescription']
         #swagger.description = "Get all Prescription"
        */
    try {
      let data = await PrescriptionService.getAll();

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
        #swagger.tags = ['Prescription']
         #swagger.description = "Get one Prescription (give prescription_id)"
        */
    try {
      const id = req.params.id;
      let data = await PrescriptionService.getOne(id);

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
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Prescription']

    try {
      const { booking_id, note, usage } = req.body;

      // const url = await Firebase.uploadImage(file);
      // let data = await PrescriptionService.createPrescription(req.body, url);
      let data = await PrescriptionService.createPrescription(req.body);

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
        #swagger.tags = ['Prescription']
         #swagger.description = "Update a Prescription (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];
      const { note, usage } = req.body;

      let data = await PrescriptionService.updatePrescription(id, req.body);
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
        #swagger.tags = ['Prescription']
         #swagger.description = "Delete Prescription (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await PrescriptionService.deletePrescription(id);
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
