const CageService = require("../services/CageService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Cage']
         #swagger.description = "Get all Cage  "
        */
    try {
      const { size, status } = req.query;
      let data = await CageService.getAll(req.query);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Cage successful!",
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
      console.log("____Cannot get Cage", error);
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async schedule_cage(req, res) {
    /* 
        #swagger.tags = ['Cage']
         #swagger.description = "schedule_cage"
        */
    try {
      const { start_date, end_date } = req.query;
      let data = await CageService.schedule_cage(start_date, end_date);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get schedule_cage successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Not Found!",
          // data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get schedule_cage", error);
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Cage']
         #swagger.description = "Get one Cage (give Cage_id)"
        */
    try {
      const id = req.params.id;
      let data = await CageService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Cage successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Cage not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Cage");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Cage']

    try {
      const { boarding_id, bird_id, size } = req.body;

      // const url = await Firebase.uploadImage(file);
      let data = await CageService.createCage(req.body);

      console.log("____Create Cage Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Cage Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Cage Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Cage']
         #swagger.description = "Update a Cage (give Cage_id)"
        */
    try {
      const id = req.params["id"];
      const { boarding_id, bird_id, status, size } = req.body;

      let data = await CageService.updateCage(id, req.body);
      console.log("____Update Cage Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Cage Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Cage Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Cage']
         #swagger.description = "Delete Cage (give Cage_id)"
        */
    try {
      const id = req.params["id"];

      let data = await CageService.deleteCage(id);
      console.log("____Delete Cage Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Cage Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Cage Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
