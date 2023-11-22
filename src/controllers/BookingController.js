const BookingService = require("../services/BookingService");
const BoardingService = require("../services/BoardingService");
const ChatService = require("../services/ChatService");
const VeterinarianSlotDetailService = require("../services/VeterinarianSlotDetailService");
const Firebase = require("../services/Firebase");
const db = require("../models/index");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Booking']
         #swagger.description = "Get all Booking"
        */
    try {
      const { arrival_date, status, account_id } = req.query;
      let data = await BookingService.getAll(req.query);

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
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Booking']
         #swagger.description = "Get one Booking (give booking_id)"
        */
    try {
      const id = req.params.id;
      const { service_type_id } = req.query;
      let data = await BookingService.getOne(id, req.query);

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
      console.log("____Cannot get Booking", error);
      return res.status(400).json({
        status: 400,
        message: "Booking not exist!",
      });
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Booking']
    //#swagger.description = "Booking HC thif moi truyen vet_id, con lai k truyen"
    try {
      const {
        account_id,
        time_id,
        bird_id,
        veterinarian_id,
        symptom,
        status,
        // diagnosis,
        // recommendations,

        // booking_date,
        estimate_time,
        money_has_paid,
        // checkin_time,
        customer_name,
        note,
        service_type,
        arrival_date,
        departure_date,
        service_type_id,
      } = req.body;

      let available_arr = [];
      let data = [];
      let flag = false;
      if (service_type_id === "ST001") {
        // khám sức khỏe
        if (veterinarian_id) {
          // khám sức khỏe theo bác sĩ
          available_arr = await VeterinarianSlotDetailService.isAvailableVet(
            time_id,
            veterinarian_id
          );
          if (available_arr.length > 0) {
            await VeterinarianSlotDetailService.updateVeterinarianSlotDetailNoId(
              req.body
            ); //chuyển status -> unavailable
            data = await BookingService.createBooking(req.body);
          }
        } else {
          // khám sức khỏe theo ngày
          available_arr = await VeterinarianSlotDetailService.isAvailableHC(
            time_id,
            service_type_id,
            "S001"
          );

          if (available_arr.length > 0) {
            flag = true;
          }
        }
      } else {
        // grooming, boarding theo ngày
        available_arr = await VeterinarianSlotDetailService.isAvailable(
          time_id,
          service_type_id
        );
        if (available_arr.length > 0) {
          flag = true;
        }
      }
      if (flag) {
        // đặt theo ngày, không có vet_id
        req.body.veterinarian_id = available_arr[0].veterinarian_id; //tự gán bác sĩ đầu tiên
        await VeterinarianSlotDetailService.updateVeterinarianSlotDetailNoId(
          req.body
        ); //chuyển status -> unavailable
        data = await BookingService.createBooking(req.body);

        if (service_type_id === "ST003") {
          //boarding
          let temp = {
            ...data.dataValues,
            departure_date,
          };
          let boarding = await BoardingService.createBoarding(temp);

          temp = { ...boarding.dataValues, customer_id: account_id };
          let chat = await ChatService.createChat(temp);
          await db.content_chat.create({
            user1: "clinic",
            user2: account_id,
            message: "Cảm ơn bạn đã sử dụng dịch vụ bên chúng tui !",
            type: "sent",
            chat_id: chat.dataValues.chat_id,
            status: 1,
          });
          await db.content_chat.create({
            user1: account_id,
            user2: "clinic",
            message: "Cảm ơn bạn đã sử dụng dịch vụ bên chúng tui!",
            type: "receive",
            chat_id: chat.dataValues.chat_id,
            status: 1,
          });
        }
      }

      if (available_arr.length > 0) {
        let datatoqr = {
          booking_id: data.dataValues.booking_id,
          arrival_date: arrival_date,
          customer_name: customer_name,
          veterinarian_id: veterinarian_id,
          service_type_id: service_type_id,
        };
        let dataToEncode = JSON.stringify(datatoqr);
        let qr_code = await Firebase.gen_qr(dataToEncode);
        let data_body = {
          booking_id: data.dataValues.booking_id,
          qr_code,
        };

        await BookingService.updateBooking(data_body.booking_id, data_body);

        console.log("____Create Booking Successful");
        return res.status(200).json({
          status: 200,
          message: "Create Booking Successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "un_available booking",
        });
      }
    } catch (err) {
      console.log("____Create Booking Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
  async store_re_exam(req, res) {
    // #swagger.tags = ['Booking']
    //#swagger.description = "Rebooking"
    try {
      const {
        account_id,
        bird_id,
        veterinarian_id,
        status,
        customer_name,
        note,
        service_type,
        service_type_id,
        arrival_date,
        is_re_exam,
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

        booking_date,
        estimate_time,
        money_has_paid,
        checkin_time,
        // customer_name,
        qr_code,
        note,
        // service_type,
        arrival_date,
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
