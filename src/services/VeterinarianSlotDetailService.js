const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      let whereClause = {};

      if (req.veterinarian_id && req.date && req.status) {
        whereClause["veterinarian_id"] = req.veterinarian_id;
        whereClause["date"] = req.date;
        whereClause["status"] = req.status;
      }
      if (req.time_slot_clinic_id && req.status) {
        whereClause["time_slot_clinic_id"] = req.time_slot_clinic_id;
        whereClause["status"] = req.status;
      }

      data = await db.veterinarian_slot_details.findAll({
        where: whereClause,
        attributes: [
          "veterinarian_slot_detail_id",
          "time_slot_clinic_id",
          "veterinarian_id",
          "date",
          "status",
        ],
        include: [
          {
            model: db.time_slot_clinic,
            attributes: [],
            include: [
              {
                model: db.slot_clinics,
                attributes: ["time"],
              },
            ],
          },
        ],

        raw: true,
        nest: true,
      });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

// let getAll = (req) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let data = [];
//       let whereClause = {};

//       if (req.veterinarian_id && !req.time_slot_clinic_id) {
//         if (req.status) {
//           whereClause["veterinarian_id"] = req.veterinarian_id;
//           whereClause["status"] = req.status;
//         } else {
//           whereClause["veterinarian_id"] = req.veterinarian_id;
//         }
//       }
//       if (req.time_slot_clinic_id && !req.veterinarian_id) {
//         if (req.status) {
//           whereClause["time_slot_clinic_id"] = req.time_slot_clinic_id;
//           whereClause["status"] = req.status;
//         } else {
//           whereClause["time_slot_clinic_id"] = req.time_slot_clinic_id;
//         }
//       }

//       if (!req.veterinarian_id && !req.time_slot_clinic_id) {
//         if (req.status) {
//           whereClause["status"] = req.status;
//         }
//       }
//       if (req.veterinarian_id && req.time_slot_clinic_id) {
//         if (req.status) {
//           whereClause["veterinarian_id"] = req.veterinarian_id;
//           whereClause["time_slot_clinic_id"] = req.time_slot_clinic_id;
//           whereClause["status"] = req.status;
//         } else {
//           whereClause["veterinarian_id"] = req.veterinarian_id;
//           whereClause["time_slot_clinic_id"] = req.time_slot_clinic_id;
//         }
//       }

//       data = await db.veterinarian_slot_details.findAll({
//         where: whereClause,
//         attributes: [
//           "veterinarian_slot_detail_id",
//           "time_slot_clinic_id",
//           "veterinarian_id",
//           "status",
//         ],
//         include: [
//           {
//             model: db.veterinarian,
//             attributes: ["name"],
//           },
//           {
//             model: db.time_slot_clinic,
//             attributes: ["date"],
//             include: [
//               {
//                 model: db.slot_clinics,
//                 attributes: ["time"],
//               },
//             ],
//           },
//         ],

//         raw: true,
//         nest: true,
//       });

//       resolve(data);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.VeterinarianSlotDetail.findByPk(id);
      let data = await db.veterinarian_slot_details.findOne({
        where: {
          veterinarian_slot_detail_id: id,
        },
        attributes: [
          "veterinarian_slot_detail_id",
          "time_slot_clinic_id",
          "veterinarian_id",
          "status",
        ],
        include: [
          {
            model: db.time_slot_clinic,
            attributes: ["date"],
            include: [
              {
                model: db.slot_clinics,
                attributes: ["time"],
              },
            ],
          },
        ],

        raw: true,
        nest: true,
      });
      // let data = await db.veterinarian_slot_details.findAll({
      //   where: {
      //     veterinarian_id: id,
      //   },
      //   include: [{ model: db.veterinarian }],
      //   include: [
      //     {
      //       model: db.time_slot_clinic,
      //       attributes: ["date"],
      //       include: [
      //         {
      //           model: db.slot_clinics,
      //           attributes: ["time"],
      //         },
      //       ],
      //     },
      //   ],

      //   raw: true,
      //   nest: true,
      // });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createVeterinarianSlotDetail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.veterinarian_slot_details.create({
        veterinarian_slot_detail_id: id,
        booking_id: data.booking_id,
        time_created: data.time_created,
        note: data.note,
        usage: data.usage,
        status: data.status,
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateVeterinarianSlotDetail = (id, body_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.veterinarian_slot_details.update(
        {
          time_slot_clinic_id: body_data.time_slot_clinic_id,
          veterinarian_id: body_data.veterinarian_id,
          status: body_data.status,
        },
        {
          where: {
            veterinarian_slot_detail_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};
let updateVeterinarianSlotDetailNoId = (body_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.veterinarian_slot_details.update(
        {
          status: "un_available",
        },
        {
          where: {
            time_slot_clinic_id: body_data.time_id,
            veterinarian_id: body_data.veterinarian_id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteVeterinarianSlotDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.veterinarian_slot_details.update(
        {
          status: "0",
        },
        {
          where: {
            veterinarian_slot_detail_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let isAvailable = (time_slot_clinic_id, service_type_id) => {
  //check xem slot ..ngày.. ()còn bác sĩ (bac sĩ gì) làm không, tức ktr xem phòng khám còn slot để booking cho boaring, grooming
  return new Promise(async (resolve, reject) => {
    try {
      let data1 = await db.veterinarian.findAll({
        //lấy ra tất cả vet thuộc service_type
        where: {
          service_type_id: service_type_id,
          status: "1",
        },
        attributes: ["veterinarian_id"],
      });

      let data2 = await db.veterinarian_slot_details.findAll({
        // lấy ra các vet hoạt động trong ngày...giờ...
        where: {
          time_slot_clinic_id: time_slot_clinic_id,
          status: "available",
        },
        attributes: ["veterinarian_id"],
      });

      const intersection = getIntersection(data1, data2);
      resolve(intersection);
    } catch (e) {
      reject(e);
    }
  });
};
let isAvailableHC = (time_slot_clinic_id, service_type_id) => {
  //check xem slot ..ngày.. ()còn bác sĩ (bac sĩ gì) làm không, tức ktr xem phòng khám còn slot để booking HC
  return new Promise(async (resolve, reject) => {
    try {
      let data1 = await db.veterinarian.findAll({
        //lấy ra tất cả vet thuộc service_type
        where: {
          service_type_id: service_type_id,
          status: "1",
          service_id: "S001",
        },
        attributes: ["veterinarian_id"],
      });

      let data2 = await db.veterinarian_slot_details.findAll({
        // lấy ra các vet hoạt động trong ngày...giờ...
        where: {
          time_slot_clinic_id: time_slot_clinic_id,
          status: "available",
        },
        attributes: ["veterinarian_id"],
      });

      const intersection = getIntersection(data1, data2);
      resolve(intersection);
    } catch (e) {
      reject(e);
    }
  });
};
let isAvailableVet = (time_slot_clinic_id, veterinarian_id) => {
  //check xem Bác sĩ có available tại cái slot...ngày... đó không
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.veterinarian_slot_details.findAll({
        //lấy ra tất cả vet thuộc service_type
        where: {
          time_slot_clinic_id: time_slot_clinic_id,
          veterinarian_id: veterinarian_id,
          status: "available",
        },
        attributes: ["veterinarian_slot_detail_id", "status"],
      });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

function getIntersection(arr1, arr2) {
  const intersection = arr1.filter((item1) =>
    arr2.some((item2) => item1.veterinarian_id === item2.veterinarian_id)
  );
  return intersection;
}

module.exports = {
  getAll: getAll,
  getOne: getOne,
  createVeterinarianSlotDetail: createVeterinarianSlotDetail,
  updateVeterinarianSlotDetail: updateVeterinarianSlotDetail,
  updateVeterinarianSlotDetailNoId,
  deleteVeterinarianSlotDetail: deleteVeterinarianSlotDetail,
  isAvailable,
  isAvailableVet,
  isAvailableHC,
};
