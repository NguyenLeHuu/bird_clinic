const ReservationService = require("../services/ReservationService");
const Booking = require("../services/BookingService");
const Service_Form = require("../services/Service_FormService");
const Service_Form_detail = require("../services/Service_Form_detailService");
const BillService = require("../services/BillService");
const BillDetailService = require("../services/BillDetailService");
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
    /* 
        #swagger.tags = ['Reservation']
         #swagger.description = "khong truyền booking,service_form,Service_Form_detail,bill"
        */
    try {
      const {
        account_id,
        time_id,
        bird_id,
        veterinarian_id,
        symptom,
        status,
        estimate_time,
        money_has_paid,
        checkin_time,
        customer_name,
        note,
        service_type,
        arrival_date,

        service_package_id,

        payment_method,
        transaction_id,
        total_price,
      } = req.body;

      // let data = await ReservationService.createReservation(req.body);

      db.sequelize
        .transaction(async (t) => {
          try {
            let booking = await Booking.createBooking(req.body, {
              transaction: t,
            });

            booking = {
              ...booking.dataValues,
              reason_referral: "null",
              status: "paid",
              date: arrival_date,
              veterinarian_referral: "auto",
              total_price: total_price,
              qr_code: "null",
              num_ser_must_do: 1,
              num_ser_has_done: 0,
            };

            let service_form = await Service_Form.createService_Form(booking, {
              transaction: t,
            });

            service_form = {
              ...service_form.dataValues,
              service_package_id: service_package_id,
              // note: "null",
              status: "pending",
              veterinarian_id: veterinarian_id,
              total_price: total_price,
              process_at: 1,
            };
            let service_form_detail =
              await Service_Form_detail.createService_Form_detail(
                service_form,
                {
                  transaction: t,
                }
              );

            service_form = {
              ...service_form,
              title: "Hóa đơn thanh toán",
              booking_id: booking.booking_id,
              payment_method,
              transaction_id,
              status: 1,
            };
            let bill = await BillService.createBill(service_form, {
              transaction: t,
            });

            bill = {
              ...bill.dataValues,
              service_package_id,
              price: bill.total_price,
              quantity: 1,
            };
            let bill_detail = await BillDetailService.createBillDetail(bill, {
              transaction: t,
            });

            console.log("Transaction completed successfully.");
          } catch (error) {
            // Nếu có lỗi, hủy transaction và xử lý lỗi
            console.error("Transaction failed:");
          }
        })
        .then(() => {
          // Sau khi transaction kết thúc, bạn có thể thực hiện các tác vụ tiếp theo
          return res.status(200).json({
            status: 200,
            message: "Create Reservation Successful!",
          });
        });
    } catch (err) {
      console.log("____");
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
