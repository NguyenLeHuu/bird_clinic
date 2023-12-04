const VeterinarianSlotDetailService = require("../services/VeterinarianSlotDetailService");
const Firebase = require("../services/Firebase");
const { parse } = require("csv-parse");
const db = require("../models/index");
const streamifier = require("streamifier");
module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['veterinarian_slot_detail']
         #swagger.description = "Get all VeterinarianSlotDetail (truyen cả 3 cái sau, truyền cái đầu với cái cuối)"
        */
    try {
      const { time_slot_clinic_id, veterinarian_id, date, status } = req.query;
      let data = await VeterinarianSlotDetailService.getAll(req.query);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get VeterinarianSlotDetail successful!",
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
      console.log("____Cannot get VeterinarianSlotDetail");
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['veterinarian_slot_detail']
         #swagger.description = "Get one VeterinarianSlotDetail"
        */
    try {
      const id = req.params.id;
      let data = await VeterinarianSlotDetailService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get VeterinarianSlotDetail successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "VeterinarianSlotDetail not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get VeterinarianSlotDetail");
    }
  },

  async store(req, res) {
    // #swagger.tags = ['veterinarian_slot_detail']

    try {
      const { time_slot_clinic_id, veterinarian_id, status } = req.body;

      // const url = await Firebase.uploadImage(file);
      // let data = await VeterinarianSlotDetailService.createVeterinarianSlotDetail(req.body, url);
      let data =
        await VeterinarianSlotDetailService.createVeterinarianSlotDetail(
          req.body
        );

      console.log("____Create VeterinarianSlotDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Create VeterinarianSlotDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create VeterinarianSlotDetail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async storeWithFile(req, res) {
    // #swagger.tags = ['veterinarian_slot_detail']

    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['excelFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const fileBuffer = req.file.buffer;
      let results = [];
      const stream = streamifier.createReadStream(fileBuffer);

      stream
        .pipe(
          parse({
            comment: "#",
            columns: true,
          })
        )
        .on("data", (data) => {
          results.push(data);
        })
        .on("error", (err) => {
          console.log(err);
          res.status(500).json({ status: 500, message: "Lỗi khi xử lý file" });
        })
        .on("end", async () => {
          console.log(`${results.length} records`);
          // console.log(results);
          const transformedResults = results.map((row) => {
            if (row.time_slot_clinic_id === "") {
              return {
                ...row,
                time_slot_clinic_id: null,
              };
            }
            return row;
          });

          const dbFields = [
            "veterinarian_slot_detail_id",
            "time_slot_clinic_id",
            "veterinarian_id",
            "status",
            "date",
          ];

          const cleanedResults = transformedResults.map((row) => {
            const cleanedRow = {};
            dbFields.forEach((field) => {
              cleanedRow[field] = row[field];
            });
            return cleanedRow;
          });
          console.log(cleanedResults);
          try {
            await db.veterinarian_slot_details.bulkCreate(cleanedResults, {
              fields: dbFields,
            });

            return res
              .status(200)
              .json({ status: 200, message: "Import thành công" });
          } catch (error) {
            console.log(error);
            if (!res.headersSent) {
              return res
                .status(404)
                .json({ status: 404, message: "Lỗi them dữ liệu", error });
            }
          }
        });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: 500, message: "Lỗi khi xử lý file", error });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['veterinarian_slot_detail']
         #swagger.description = "Update a VeterinarianSlotDetail (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];
      const { time_slot_clinic_id, veterinarian_id, status } = req.body;

      let data =
        await VeterinarianSlotDetailService.updateVeterinarianSlotDetail(
          id,
          req.body
        );
      console.log("____Update VeterinarianSlotDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Update VeterinarianSlotDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update VeterinarianSlotDetail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['veterinarian_slot_detail']
         #swagger.description = "Delete VeterinarianSlotDetail (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data =
        await VeterinarianSlotDetailService.deleteVeterinarianSlotDetail(id);
      console.log("____Delete VeterinarianSlotDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete VeterinarianSlotDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete VeterinarianSlotDetail Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async is_booking_available(req, res) {
    /* 
        #swagger.tags = ['veterinarian_slot_detail']
         #swagger.description = "check xem đặt có khả dụng k"
        */
    try {
      const time_slot_clinic_id = req.params["time_slot_clinic_id"];

      const { service_type_id } = req.query;
      let data = await VeterinarianSlotDetailService.isAvailable(
        time_slot_clinic_id,
        service_type_id
      );

      return res.status(200).json({
        status: 200,
        message: "check Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____check Failed", err);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
