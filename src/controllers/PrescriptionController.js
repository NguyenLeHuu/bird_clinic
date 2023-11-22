const PrescriptionService = require("../services/PrescriptionService");
const PrescriptionDetailService = require("../services/PrescriptionDetailService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Prescription']
         #swagger.description = "Get all Prescription"
        */
    try {
      const { booking_id } = req.query;
      let data = await PrescriptionService.getAll(req.query);

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
      return res.status(400).json({
        status: 400,
        message: error,
      });
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
      const { booking_id, arr_medicine } = req.body;
      let data = await PrescriptionService.createPrescription(req.body);
      if (arr_medicine) {
        if (Array.isArray(arr_medicine)) {
          arr_medicine.forEach(async (item, index) => {
            let temp = {
              ...data.dataValues,
              medicine_id: item.medicine_id,
              usage: item.usage,
              total_dose: item.total_dose,
              dose: item.dose,
              day: item.day,
              note: item.note,
            };
            await PrescriptionDetailService.createPrescriptionDetail(temp);
          });
        }
      }

      console.log("____Create Prescription Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Prescription Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Prescription Failed", err);
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
