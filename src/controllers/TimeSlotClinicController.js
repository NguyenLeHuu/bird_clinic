const TimeSlotClinicService = require("../services/TimeSlotClinicService");
const Firebase = require("../services/Firebase");
const db = require("../models/index");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['TimeSlotClinic']
         #swagger.description = "lấy ra các mốc (slot) khả dụng trong ngày nào đó của dịch vụ lớn nào đó"
        */
    try {
      const { date, service_type_id } = req.query;
      let data;
      if (service_type_id && date) {
        data = await db.sequelize.query(
          `
        SELECT ts.time_slot_clinic_id, sc.time
FROM time_slot_clinics ts
INNER JOIN slot_clinics sc ON ts.slot_clinic_id = sc.slot_clinic_id
WHERE ts.date = :date -- Thay 'your_date' bằng giá trị date bạn đang tìm kiếm
  AND ts.time_slot_clinic_id IN (
    SELECT vsd.time_slot_clinic_id
    FROM veterinarian_slot_details vsd
    INNER JOIN veterinarians v ON vsd.veterinarian_id = v.veterinarian_id
    WHERE v.service_type_id = :stid -- Thay 'your_service_type_id' bằng giá trị service_type_id bạn đang tìm kiếm
        AND vsd.status = 'available'
  );

      `,
          {
            replacements: {
              date: date,
              stid: service_type_id,
            },
            type: db.sequelize.QueryTypes.SELECT,
          }
        );
      } else {
        data = await TimeSlotClinicService.getAll(req.query);
      }
      //       let data = await db.sequelize.query(
      //         `
      //         SELECT ts.date, sc.time
      // FROM time_slot_clinics ts
      // INNER JOIN slot_clinics sc ON ts.slot_clinic_id = sc.slot_clinic_id
      // LEFT JOIN veterinarian_slot_details vsd ON ts.time_slot_clinic_id = vsd.time_slot_clinic_id
      // LEFT JOIN veterinarians v ON vsd.veterinarian_id = v.veterinarian_id
      // WHERE ts.date = :date -- Thay 'your_date' bằng giá trị date bạn đang tìm kiếm
      //   AND v.service_type_id = :stid -- Thay 'your_service_type_id' bằng giá trị service_type_id bạn đang tìm kiếm
      //   AND (vsd.status IS NULL OR vsd.status = 'available');

      //       `,
      //         {
      //           replacements: {
      //             date: date,
      //             stid: service_type_id,
      //           },
      //           type: db.sequelize.QueryTypes.SELECT,
      //         }
      //       );
      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get TimeSlotClinic successful!",
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
      console.log("____Cannot get TimeSlotClinic", error);
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['TimeSlotClinic']
         #swagger.description = "Get one TimeSlotClinic (give TimeSlotClinic_id)"
        */
    try {
      const id = req.params.id;
      let data = await TimeSlotClinicService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get TimeSlotClinic successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "TimeSlotClinic not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get TimeSlotClinic");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['TimeSlotClinic']

    try {
      const { slot_clinic_id, date } = req.body;

      // const url = await Firebase.uploadImage(file);
      let data = await TimeSlotClinicService.createTimeSlotClinic(req.body);

      console.log("____Create TimeSlotClinic Successful");

      return res.status(200).json({
        status: 200,
        message: "Create TimeSlotClinic Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create TimeSlotClinic Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['TimeSlotClinic']
         #swagger.description = "Update a TimeSlotClinic (give TimeSlotClinic_id)"
        */
    try {
      const id = req.params["id"];
      const { slot_clinic_id, date } = req.body;

      let data = await TimeSlotClinicService.updateTimeSlotClinic(id, req.body);
      console.log("____Update TimeSlotClinic Successful");

      return res.status(200).json({
        status: 200,
        message: "Update TimeSlotClinic Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update TimeSlotClinic Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['TimeSlotClinic']
         #swagger.description = "Delete TimeSlotClinic (give TimeSlotClinic_id)"
        */
    try {
      const id = req.params["id"];

      let data = await TimeSlotClinicService.deleteTimeSlotClinic(id);
      console.log("____Delete TimeSlotClinic Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete TimeSlotClinic Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete TimeSlotClinic Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
