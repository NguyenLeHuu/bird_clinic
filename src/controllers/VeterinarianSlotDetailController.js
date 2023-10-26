const VeterinarianSlotDetailService = require("../services/VeterinarianSlotDetailService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['VeterinarianSlotDetail']
         #swagger.description = "Get all VeterinarianSlotDetail (truyen cả 3 hoặc không truyền)"
        */
    try {
      const { veterinarian_id, date, status } = req.query;
      let data = await VeterinarianSlotDetailService.getAll(req.query);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get VeterinarianSlotDetail successful!",
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
      console.log("____Cannot get VeterinarianSlotDetail");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['VeterinarianSlotDetail']
         #swagger.description = "Get one VeterinarianSlotDetail"
        */
    try {
      const id = req.params.id;
      let data = await VeterinarianSlotDetailService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get VeterinarianSlotDetail successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "VeterinarianSlotDetail not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get VeterinarianSlotDetail");
    }
  },

  async store(req, res) {
    // #swagger.tags = ['VeterinarianSlotDetail']

    try {
      const { time_slot_clinic_id, veterinarian_id, status } = req.body;

      // const url = await Firebase.uploadImage(file);
      // let data = await VeterinarianSlotDetailService.createVeterinarianSlotDetail(req.body, url);
      let data =
        await VeterinarianSlotDetailService.createVeterinarianSlotDetail(
          req.body
        );

      console.log("____Create VeterinarianSlotDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Create VeterinarianSlotDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create VeterinarianSlotDetail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['VeterinarianSlotDetail']
         #swagger.description = "Update a VeterinarianSlotDetail (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];
      const { time_slot_clinic_id, veterinarian_id, status } = req.body;

      let data =
        await VeterinarianSlotDetailService.updateVeterinarianSlotDetail(
          id,
          req.body
        );
      console.log("____Update VeterinarianSlotDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Update VeterinarianSlotDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update VeterinarianSlotDetail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['VeterinarianSlotDetail']
         #swagger.description = "Delete VeterinarianSlotDetail (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data =
        await VeterinarianSlotDetailService.deleteVeterinarianSlotDetail(id);
      console.log("____Delete VeterinarianSlotDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete VeterinarianSlotDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete VeterinarianSlotDetail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
