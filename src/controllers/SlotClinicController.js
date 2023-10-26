const SlotClinicService = require("../services/SlotClinicService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['SlotClinic']
         #swagger.description = "Get all SlotClinic  "
        */
    try {
      // const type = req.query.type;
      // const type_id = req.query.type_id;
      let data = await SlotClinicService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get SlotClinic successful!",
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
      console.log("____Cannot get SlotClinic");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['SlotClinic']
         #swagger.description = "Get one SlotClinic (give SlotClinic_id)"
        */
    try {
      const id = req.params.id;
      let data = await SlotClinicService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get SlotClinic successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "SlotClinic not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get SlotClinic");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['SlotClinic']

    try {
      const { id, time } = req.body;

      // const url = await Firebase.uploadImage(file);
      let data = await SlotClinicService.createSlotClinic(req.body);

      console.log("____Create SlotClinic Successful");

      return res.status(200).json({
        status: 200,
        message: "Create SlotClinic Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create SlotClinic Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['SlotClinic']
         #swagger.description = "Update a SlotClinic (give SlotClinic_id)"
        */
    try {
      const id = req.params["id"];
      const { time } = req.body;

      let data = await SlotClinicService.updateSlotClinic(id, req.body);
      console.log("____Update SlotClinic Successful");

      return res.status(200).json({
        status: 200,
        message: "Update SlotClinic Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update SlotClinic Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['SlotClinic']
         #swagger.description = "Delete SlotClinic (give SlotClinic_id)"
        */
    try {
      const id = req.params["id"];

      let data = await SlotClinicService.deleteSlotClinic(id);
      console.log("____Delete SlotClinic Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete SlotClinic Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete SlotClinic Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
