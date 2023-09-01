const qr = require("qrcode");
let data = {
  name: "Le Huu",
  email: "lehuu@gmail.com",
};

let stJson = JSON.stringify(data);
qr.toString(stJson, { type: "terminal" }, function (err, code) {
  if (err) return console.log("err qr");
  console.log(code);
});
