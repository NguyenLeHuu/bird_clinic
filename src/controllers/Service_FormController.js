const Service_FormService = require("../services/Service_FormService");
const Firebase = require("../services/Firebase");
const Service_Form_detail = require("../services/Service_Form_detailService");
const VeterinarianSlotDetailService = require("../services/VeterinarianSlotDetailService");
const TimeSlotClinicService = require("../services/TimeSlotClinicService");
const ServicePackageService = require("../services/ServicePackageService");
const BookingService = require("../services/BookingService");
const db = require("../models/index");
const { Op, where } = require("sequelize");
module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Service_Form']
         #swagger.description = "Truyen booking_id se lay theo booking (không hiện sf gốc)"
        */
    try {
      const { booking_id } = req.query;
      let data = await Service_FormService.getAll(req.query);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Service_Form successful!",
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
      console.log("____Cannot get Service_Form");
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Service_Form']
         #swagger.description = "Get one Service_Form (give service_form_id)"
        */
    try {
      const id = req.params.id;
      let data = await Service_FormService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Service_Form successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Service_Form not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Service_Form", error);
      return res.status(400).json({
        status: 400,
        message: error,
      });
      // throw error;
    }
  },

  async store(req, res) {
    /* 
        #swagger.tags = ['Service_Form']
         #swagger.description = "arr_service_pack optional truyền mảng"
        */

    try {
      const {
        bird_id,
        booking_id,
        reason_referral,
        status,
        date,
        veterinarian_referral,
        total_price,
        qr_code,
        num_ser_must_do,
        num_ser_has_done,

        // service_type_id,
        arr_service_pack,
      } = req.body;

      let data = await Service_FormService.createService_Form(req.body);
      let booking = await BookingService.getOne(booking_id, "");

      if (Array.isArray(arr_service_pack)) {
        arr_service_pack.forEach(async (item, index) => {
          let temp = {};

          let service_package = await ServicePackageService.getOne(
            item.service_package_id
          );

          let service_id = service_package.service_id;
          let available_arr_vetid = [];

          switch (booking.service_type_id) {
            case "ST001":
              if (item.service_package_id === "SP1") {
                console.log("chạy zô sp1");
                let veterinarian_id = booking.veterinarian_id;
                temp = {
                  ...data.dataValues,
                  service_package_id: item.service_package_id,
                  veterinarian_id,
                  note: item.note,
                  status: "pending",
                  booking_id,
                  process_at: 1,
                };

                await Service_Form_detail.createService_Form_detail(temp);
              } else {
                console.log("chạy zô khác sp1");
                let veterinarian_id;
                available_arr_vetid =
                  await VeterinarianSlotDetailService.isAvailableHCNoTime(
                    date,
                    "ST001",
                    service_id
                  );

                if (available_arr_vetid.length > 0) {
                  // Tạo mảng các Promises
                  let record_min;
                  const promises = available_arr_vetid.map(
                    async (vet_id_obj) => {
                      const { count } =
                        await db.service_form_detail.findAndCountAll({
                          where: {
                            veterinarian_id: vet_id_obj.veterinarian_id,
                            status: { [Op.notIn]: ["done", "cancelled"] },
                          },
                        });
                      record_min = count;

                      console.log(
                        `count ${count} doctor ${vet_id_obj.veterinarian_id}`
                      );
                      if (count <= record_min) {
                        record_min = count;
                        veterinarian_id = vet_id_obj.veterinarian_id;
                        console.log(`doctor ${vet_id_obj.veterinarian_id}`);
                      }
                    }
                  );

                  await Promise.all(promises);

                  temp = {
                    ...data.dataValues,
                    service_package_id: item.service_package_id,
                    veterinarian_id,
                    note: item.note,
                    status: "pending",
                    booking_id,
                    process_at: 1,
                  };
                  console.log(
                    "veterinarian_id nguoi duoc chon: ",
                    veterinarian_id
                  );

                  await Service_Form_detail.createService_Form_detail(temp);
                } else {
                  console.log("không ai làm ngày này hết");
                  return res.status(400).json({
                    status: 400,
                    message: "Loi taoj sfd",
                  });
                }
              }

              break;

            case "ST002":
            case "ST003":
              temp = {
                ...data.dataValues,
                service_package_id: item.service_package_id,
                veterinarian_id: booking.veterinarian_id,
                note: item.note,
                status: "pending",
                booking_id,
                process_at: 1,
              };
              await Service_Form_detail.createService_Form_detail(temp);
              break;
            default:
              return res.status(400).json({
                status: 400,
                message: "Truyền đúng dữ liệu đi",
              });
          }
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Truyền mảng package vào",
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Create Service_Form + service_form_detail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Service_Form Failed", err);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Service_Form']
         #swagger.description = "Update a Service_Form"
        */
    try {
      const id = req.params["id"];

      const { status, date, qr_code, num_ser_must_do, num_ser_has_done } =
        req.body;

      let data = await Service_FormService.updateService_Form(id, req.body);

      console.log("____Update Service_Form Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Service_Form Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Service_Form Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Service_Form']
         #swagger.description = "Delete Service_Form (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await Service_FormService.deleteService_Form(id);
      console.log("____Delete Service_Form Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Service_Form Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Service_FormService Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
