const TimeSlotClinicService = require("../services/TimeSlotClinicService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['TimeSlotClinic']
         #swagger.description = "Get all TimeSlotClinic  "
        */
    try {
      const { date } = req.query;
      let data = await TimeSlotClinicService.getAll(req.query);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get TimeSlotClinic successful!",
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
      console.log("____Cannot get TimeSlotClinic", error);
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['TimeSlotClinic']
         #swagger.description = "Get one TimeSlotClinic (give TimeSlotClinic_id)"
        */
    try {
      const id = req.params.id;
      let data = await TimeSlotClinicService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get TimeSlotClinic successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "TimeSlotClinic not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get TimeSlotClinic");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['TimeSlotClinic']

    try {
      const { slot_clinic_id, date } = req.body;

      // const url = await Firebase.uploadImage(file);
      let data = await TimeSlotClinicService.createTimeSlotClinic(req.body);

      console.log("____Create TimeSlotClinic Successful");

      return res.status(200).json({
        status: 200,
        message: "Create TimeSlotClinic Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create TimeSlotClinic Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['TimeSlotClinic']
         #swagger.description = "Update a TimeSlotClinic (give TimeSlotClinic_id)"
        */
    try {
      const id = req.params["id"];
      const { slot_clinic_id, date } = req.body;

      let data = await TimeSlotClinicService.updateTimeSlotClinic(id, req.body);
      console.log("____Update TimeSlotClinic Successful");

      return res.status(200).json({
        status: 200,
        message: "Update TimeSlotClinic Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update TimeSlotClinic Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['TimeSlotClinic']
         #swagger.description = "Delete TimeSlotClinic (give TimeSlotClinic_id)"
        */
    try {
      const id = req.params["id"];

      let data = await TimeSlotClinicService.deleteTimeSlotClinic(id);
      console.log("____Delete TimeSlotClinic Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete TimeSlotClinic Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete TimeSlotClinic Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
