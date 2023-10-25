const MedicineService = require("../services/MedicineService");
const MediaService = require("../services/MediaService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Medicine']
         #swagger.description = "Get all Medicine  "
        */
    try {
      let data = await MedicineService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Medicine successful!",
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
      console.log("____Cannot get Medicine");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Medicine']
         #swagger.description = "Get one Medicine (give Medicine_id)"
        */
    try {
      const id = req.params.id;
      let data = await MedicineService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Medicine successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Medicine not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Medicine");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Medicine']

    try {
      const { name, unit, usage, description, sideEffects } = req.body;

      // const url = await Firebase.uploadImage(file);
      // let listImage = [];

      // req.files.forEach(async (file) => {
      //   const url = await Firebase.uploadImage(file);
      //   await MediaService.createMedia(req.body, url);
      //   // listImage.push(url);
      // });
      let data = await MedicineService.createMedicine(req.body);

      console.log("____Create Medicine Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Medicine Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Medicine Failed", err);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    //   #swagger.tags = ['Medicine']

    try {
      const id = req.params["id"];
      // const url = await Firebase.uploadImage(file);
      const { name, unit, usage, description, sideEffects } = req.body;

      let data = await MedicineService.updateMedicine(id, req.body);
      console.log("____Update Medicine Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Medicine Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Medicine Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Medicine']
         #swagger.description = "Delete Medicine (give Medicine_id)"
        */
    try {
      const id = req.params["id"];

      let data = await MedicineService.deleteMedicine(id);
      console.log("____Delete Medicine Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Medicine Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Medicine Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
