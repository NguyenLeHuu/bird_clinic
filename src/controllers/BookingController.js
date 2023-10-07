const BookingService = require("../services/BookingService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Booking']
         #swagger.description = "Get all Booking"
        */
    try {
      let data = await BookingService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Booking successful!",
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
      console.log(error);
      console.log("____Cannot get Booking");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Booking']
         #swagger.description = "Get one Booking (give booking_id)"
        */
    try {
      const id = req.params.id;
      let data = await BookingService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Booking successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Booking not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Booking");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Booking']

    try {
      const {
        account_id,
        time_id,
        bird_id,
        veterinarian_id,
        symptom,
        status,
        diagnosis,
        recommendations,
        temperature,
        weight,
        date,
        estimate_time,
        money_has_paid,
        checkin_time,
        customer_name,
        note,
        service_type,
      } = req.body;

      let data = await BookingService.createBooking(req.body);

      console.log("____Create Booking Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Booking Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Booking Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Booking']
         #swagger.description = "Update a Booking (give booking_id)"
        */
    try {
      const id = req.params["id"];

      const {
        // account_id,
        time_id,
        // bird_id,
        veterinarian_id,
        symptom,
        status,
        diagnosis,
        recommendations,
        temperature,
        weight,
        date,
        estimate_time,
        money_has_paid,
        // checkin_time,
        // customer_name,
        note,
        // service_type,
      } = req.body;

      let data = await BookingService.updateBooking(id, req.body);
      console.log("____Update Booking Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Booking Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Booking Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Booking']
         #swagger.description = "Delete Booking (give booking_id)"
        */
    try {
      const id = req.params["id"];

      let data = await BookingService.deleteBooking(id);
      console.log("____Delete Booking Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Booking Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Booking Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
