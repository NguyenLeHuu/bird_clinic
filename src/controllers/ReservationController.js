const Booking = require("../services/BookingService");
const Boarding = require("../services/BoardingService");
const Service_Form = require("../services/Service_FormService");
const Service_Form_detail = require("../services/Service_Form_detailService");
const BillService = require("../services/BillService");
const BillDetailService = require("../services/BillDetailService");
const CustomerService = require("../services/CustomerService");
const Firebase = require("../services/Firebase");
const db = require("../models/index");

module.exports = {
  async test(req, res) {
    /* 
        #swagger.tags = ['TEST']
         #swagger.description = "TEST"
        */
    try {
      let datatoqr = {
        name: "Le Huu",
        email: "lehuu@gmail.com",
      };

      let dataToEncode = JSON.stringify(datatoqr);

      let url = await Firebase.gen_qr(dataToEncode);

      return res.status(200).json({
        status: 200,
        message: "test Successful!",
        data: url,
      });
    } catch (err) {
      console.log("____test Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
  // async store(req, res) {
  //   /*
  //       #swagger.tags = ['Reservation']

  //       */
  //   try {
  //     const {
  //       account_id,
  //       time_id,
  //       bird_id,
  //       veterinarian_id,
  //       symptom,
  //       status,
  //       estimate_time,
  //       money_has_paid,
  //       checkin_time,
  //       customer_name,
  //       note,
  //       service_type,
  //       arrival_date,

  //       service_package_id,

  //       payment_method,
  //       transaction_id,
  //       total_price,
  //     } = req.body;

  //     db.sequelize
  //       .transaction(async (t) => {
  //         try {
  //           let booking = await Booking.createBooking(req.body, {
  //             transaction: t,
  //           });

  //           booking = {
  //             ...booking.dataValues,
  //             reason_referral: "null",
  //             status: "paid",
  //             date: arrival_date,
  //             veterinarian_referral: "auto",
  //             total_price: total_price,
  //             qr_code: "null",
  //             num_ser_must_do: 1,
  //             num_ser_has_done: 0,
  //           };

  //           let service_form = await Service_Form.createService_Form(booking, {
  //             transaction: t,
  //           });

  //           service_form = {
  //             ...service_form.dataValues,
  //             service_package_id: service_package_id,
  //             // note: "null",
  //             status: "pending",
  //             veterinarian_id: veterinarian_id,
  //             total_price: total_price,
  //             process_at: 1,
  //           };
  //           let service_form_detail =
  //             await Service_Form_detail.createService_Form_detail(
  //               service_form,
  //               {
  //                 transaction: t,
  //               }
  //             );

  //           service_form = {
  //             ...service_form,
  //             title: "Hóa đơn thanh toán",
  //             booking_id: booking.booking_id,
  //             payment_method,
  //             transaction_id,
  //             status: 1,
  //           };
  //           let bill = await BillService.createBill(service_form, {
  //             transaction: t,
  //           });

  //           await CustomerService.updateTotalSpent(account_id, total_price);

  //           bill = {
  //             ...bill.dataValues,
  //             service_package_id,
  //             price: bill.total_price,
  //             quantity: 1,
  //           };
  //           let bill_detail = await BillDetailService.createBillDetail(bill, {
  //             transaction: t,
  //           });

  //           console.log("Transaction completed successfully.");
  //         } catch (error) {
  //           // Nếu có lỗi, hủy transaction và xử lý lỗi
  //           console.error("Transaction failed:");
  //         }
  //       })
  //       .then(() => {
  //         // Sau khi transaction kết thúc, bạn có thể thực hiện các tác vụ tiếp theo
  //         return res.status(200).json({
  //           status: 200,
  //           message: "Create Reservation Successful!",
  //         });
  //       });
  //   } catch (err) {
  //     console.log("____");
  //     return res.status(400).json({
  //       status: 400,
  //       message: err,
  //     });
  //   }
  // },
  // async store_boarding(req, res) {
  //   /*
  //       #swagger.tags = ['Reservation']
  //        #swagger.description = "Reservation boarding"

  //       */
  //   try {
  //     const {
  //       account_id,
  //       time_id,
  //       bird_id,
  //       veterinarian_id,
  //       symptom,
  //       status,
  //       estimate_time,
  //       money_has_paid,
  //       checkin_time,
  //       customer_name,
  //       note,
  //       service_type,
  //       arrival_date,

  //       service_package_id,

  //       payment_method,
  //       transaction_id,
  //       total_price,

  //       departure_date,
  //       room_type,
  //     } = req.body;

  //     db.sequelize
  //       .transaction(async (t) => {
  //         try {
  //           let booking = await Booking.createBooking(req.body, {
  //             transaction: t,
  //           });

  //           booking = {
  //             ...booking.dataValues,
  //             reason_referral: "null",
  //             status: "paid",
  //             date: arrival_date,
  //             veterinarian_referral: "auto",
  //             total_price: total_price,
  //             qr_code: "null",
  //             num_ser_must_do: 1,
  //             num_ser_has_done: 0,
  //             departure_date,
  //             room_type,
  //           };

  //           let boarding = await Boarding.createBoarding(booking, {
  //             transaction: t,
  //           });

  //           let service_form = await Service_Form.createService_Form(booking, {
  //             transaction: t,
  //           });

  //           service_form = {
  //             ...service_form.dataValues,
  //             service_package_id: service_package_id,
  //             // note: "null",
  //             status: "pending",
  //             veterinarian_id: veterinarian_id,
  //             total_price: total_price,
  //             process_at: 1,
  //           };
  //           let service_form_detail =
  //             await Service_Form_detail.createService_Form_detail(
  //               service_form,
  //               {
  //                 transaction: t,
  //               }
  //             );

  //           service_form = {
  //             ...service_form,
  //             title: "Hóa đơn thanh toán",
  //             booking_id: booking.booking_id,
  //             payment_method,
  //             transaction_id,
  //             status: 1,
  //           };
  //           let bill = await BillService.createBill(service_form, {
  //             transaction: t,
  //           });

  //           await CustomerService.updateTotalSpent(account_id, total_price);

  //           bill = {
  //             ...bill.dataValues,
  //             service_package_id,
  //             price: bill.total_price,
  //             quantity: 1,
  //           };
  //           let bill_detail = await BillDetailService.createBillDetail(bill, {
  //             transaction: t,
  //           });

  //           console.log("Transaction completed successfully.");
  //         } catch (error) {
  //           // Nếu có lỗi, hủy transaction và xử lý lỗi
  //           console.error("Transaction failed:", error);
  //         }
  //       })
  //       .then(() => {
  //         // Sau khi transaction kết thúc, bạn có thể thực hiện các tác vụ tiếp theo
  //         return res.status(200).json({
  //           status: 200,
  //           message: "Create Reservation Successful!",
  //         });
  //       });
  //   } catch (err) {
  //     console.log("____");
  //     return res.status(400).json({
  //       status: 400,
  //       message: err,
  //     });
  //   }
  // },
};
