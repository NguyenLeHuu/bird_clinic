const BillService = require("../services/BillService");
const Service_FormService = require("../services/Service_FormService");
const BillDetailService = require("../services/BillDetailService");
const ServicePackageService = require("../services/ServicePackageService");
const BookingService = require("../services/BookingService");
const Firebase = require("../services/Firebase");
const db = require("../models/index");
const CustomerService = require("../services/CustomerService");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Bill']
         #swagger.description = "Get all Bill"
        */
    try {
      // const id = req.params.id;
      // let data = await BillService.getAll(id);
      let data = await BillService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get bill successful!",
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
      console.log("____Cannot get bill");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Bill']
         #swagger.description = "Get one Bill (give bill_id)"
        */
    try {
      const id = req.params.id;
      let data = await BillService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get bill successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Bill not exist!",
        });
      }
    } catch (error) {
      console.log("____Cannot get bill");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Bill']

    try {
      const {
        title,
        total_price,
        service_form_id,
        booking_id,
        payment_method,
        transaction_id,
        // status,
        // time,
      } = req.body;

      let data = await BillService.createBill(req.body); // tạo bill

      let booking = await BookingService.getOne(booking_id, ""); //cập nhật total_spent, money_has_paid
      await db.booking.update(
        {
          money_has_paid:
            parseFloat(booking.money_has_paid) + parseFloat(total_price),
        },
        {
          where: {
            booking_id: booking_id,
          },
        }
      );
      await CustomerService.updateTotalSpent(booking.account_id, total_price);

      let service_form = await Service_FormService.getOne(service_form_id); //tạo bill_detail
      // console.log(service_form[0].dataValues.service_form_details);
      let arr = service_form[0].dataValues.service_form_details;
      arr.forEach(async (item, index) => {
        let sp = await ServicePackageService.getOne(
          item.dataValues.service_package_id
        );
        let temp = {
          bill_id: data.dataValues.bill_id,
          service_package_id: item.dataValues.service_package_id,
          price: sp.price,
        };
        await BillDetailService.createBillDetail(temp);
      });

      console.log("____Create Bill Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Bill Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Bill Failed", err);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  // async update(req, res) {
  //   //  #swagger.tags = ['Bill']
  //   try {
  //     const id = req.params["id"];

  //     const {
  //       payment_method,
  //       transaction_id,
  //       status,
  //       // time_create,
  //     } = req.body;

  //     let data = await BillService.updateBill(id, req.body);
  //     console.log("____Update Bill Successful");

  //     return res.status(200).json({
  //       status: 200,
  //       message: "Update Bill Successful!",
  //       data: data,
  //     });
  //   } catch (err) {
  //     console.log("____Update Bill Failed");
  //     return res.status(400).json({
  //       status: 400,
  //       message: err,
  //     });
  //   }
  // },

  async update1(req, res) {
    //  #swagger.tags = ['Bill']
    try {
      const id = req.params["id"];

      const {
        payment_method,
        transaction_id,
        status,
        // time_create,
      } = req.body;

      let data = await BillService.updateBill(id, req.body);
      console.log("____Update Bill Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Bill Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Bill Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Bill']
         #swagger.description = "Delete bill (give bill_id)"
        */
    try {
      const id = req.params["id"];

      let data = await BillService.deleteBill(id);
      console.log("____Delete Bill Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Bill Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Bill Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
