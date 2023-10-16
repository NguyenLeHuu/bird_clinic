const ReservationService = require("../services/ReservationService");
const Booking = require("../services/BookingService");
const Service_Form = require("../services/Service_FormService");
const Service_Form_detail = require("../services/Service_Form_detailService");
const Firebase = require("../services/Firebase");
const db = require("../models/index");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Reservation']
         #swagger.description = "Get all Reservation"
        */
    try {
      let data = await ReservationService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Reservation successful!",
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
      console.log("____Cannot get Reservation");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Reservation']
         #swagger.description = "Get one Reservation (give booking_id)"
        */
    try {
      const id = req.params.id;
      let data = await ReservationService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Reservation successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Reservation not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Reservation");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Reservation']

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

      // let data = await ReservationService.createReservation(req.body);

      db.sequelize
        .transaction(async (t) => {
          try {
            let create_booking = await Booking.createBooking(req.body);
            let create_service_form = await Service_Form.createService_Form(
              req.body
            );
            let create_service_form_detail =
              await Service_Form_detail.createService_Form_detail(req.body);

            await t.commit();

            console.log("Transaction completed successfully.");
          } catch (error) {
            // Nếu có lỗi, hủy transaction và xử lý lỗi
            await t.rollback();
            console.error("Transaction failed:", error.message);
          }
        })
        .then(() => {
          // Sau khi transaction kết thúc, bạn có thể thực hiện các tác vụ tiếp theo
        });
      return res.status(200).json({
        status: 200,
        message: "Create Reservation Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____", err);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Reservation']
         #swagger.description = "Update a Reservation (give booking_id)"
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

      let data = await ReservationService.updateReservation(id, req.body);
      console.log("____Update Reservation Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Reservation Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Reservation Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Reservation']
         #swagger.description = "Delete Reservation (give booking_id)"
        */
    try {
      const id = req.params["id"];

      let data = await ReservationService.deleteReservation(id);
      console.log("____Delete Reservation Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Reservation Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Reservation Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
