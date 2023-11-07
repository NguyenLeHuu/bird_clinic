const PrescriptionDetailService = require("../services/PrescriptionDetailService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Prescription Detail']
         #swagger.description = "Get all PrescriptionDetail"
        */
    try {
      let data = await PrescriptionDetailService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get PrescriptionDetail successful!",
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
      console.log("____Cannot get PrescriptionDetail");
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Prescription Detail']
         #swagger.description = "Get one PrescriptionDetail
        */
    try {
      const id = req.params.id;
      let data = await PrescriptionDetailService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get PrescriptionDetail successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "PrescriptionDetail not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Prescription");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Prescription Detail']

    try {
      const {
        prescription_id,
        medicine_id,
        usage,
        total_dose,
        dose,
        day,
        note,
      } = req.body;

      let data = await PrescriptionDetailService.createPrescriptionDetail(
        req.body
      );

      console.log("____Create PrescriptionDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Create PrescriptionDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create PrescriptionDetail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Prescription Detail']
         #swagger.description = "Update a PrescriptionDetail"
        */
    try {
      const id = req.params["id"];
      const { medicine_id, usage, total_dose, dose, day } = req.body;

      let data = await PrescriptionDetailService.updatePrescriptionDetail(
        id,
        req.body
      );
      console.log("____Update PrescriptionDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Update PrescriptionDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update PrescriptionDetail Failed");
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

      let data = await PrescriptionDetailService.deletePrescriptionDetail(id);
      console.log("____Delete PrescriptionDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete PrescriptionDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete PrescriptionDetail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
