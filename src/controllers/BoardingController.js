const BoardingService = require("../services/BoardingService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Boarding']
         #swagger.description = "Get all Boarding"
        */
    try {
      const { booking_id } = req.query;
      let data = await BoardingService.getAll(req.query);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Boarding successful!",
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
      console.log("____Cannot get Boarding", error);
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Boarding']
         #swagger.description = "Get one Boarding (give Boarding_id)"
        */
    try {
      const id = req.params.id;
      let data = await BoardingService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Boarding successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Boarding not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Boarding", error);
      // throw error;
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Boarding']

    try {
      const { booking_id, arrival_date, departure_date, room_type, bird_id } =
        req.body;

      // const url = await Firebase.uploadImage(file);
      let data = await BoardingService.createBoarding(req.body);

      console.log("____Create Boarding Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Boarding Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Boarding Failed", err);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Boarding']
         #swagger.description = "Update a Boarding (give Boarding_id)"
        */
    try {
      const id = req.params["id"];
      const {
        arrival_date,
        departure_date,
        room_type,
        act_arrival_date,
        act_departure_date,
        cage_id,
      } = req.body;

      let data = await BoardingService.updateBoarding(id, req.body);
      console.log("____Update Boarding Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Boarding Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Boarding Failed", err);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Boarding']
         #swagger.description = "Delete Boarding (give Boarding_id)"
        */
    try {
      const id = req.params["id"];

      let data = await BoardingService.deleteBoarding(id);
      console.log("____Delete Boarding Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Boarding Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Boarding Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
