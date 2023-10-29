const qr = require("qrcode");
// let data = {
//   name: "Le Huu",
//   email: "lehuu@gmail.com",
// };

// let stJson = JSON.stringify(data);
// qr.toString(stJson, { type: "terminal" }, function (err, code) {
//   if (err) return console.log("err qr");
//   console.log(code);
// });

const gen_qr = (dataToEncode) => {
  try {
    qr.toBuffer(dataToEncode, (err, buffer) => {
      if (err) {
        console.error("loi me roi:", err);
        return;
      }
      console.log(buffer);
      return buffer;
    });
  } catch (error) {
    console.log("____lỗi ở gen_Qr___");
  }
};

module.exports = {
  gen_qr,
};
