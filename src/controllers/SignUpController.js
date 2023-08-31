const SalerService = require("../services/SalerService");
const CustomerService = require("../services/CustomerService");

module.exports = {
  async SignUp(req, res) {
    /* 
        #swagger.tags = ['Auth']
        */
    try {
      const role = req.body.role;
      const address = req.body.address || null;
      const data = req.body.data;

      const uid = data.uid;
      const name = data.name || null;
      const email = data.email;
      const phone = data.phone || null;
      const picture = data.picture;
      // console.log(phone);

      //   {
      //     "role":"customer",
      //     "address":"any",
      //     "data":{
      //        "name":"Nguyen Le Huu (K15 HCM)",
      //        "uid":"wKoKCnfFtTe9degWSZMiI0KPTO52",
      //        "email":"huunlse150800@fpt.edu.vn",
      //        "phone":"0354187011",
      //        "picture":"https://lh3.googleusercontent.com/a/AEdFTp5RMS1vUvL89bysFnUyGjk-_Z7a5i5Kk8lRn8Fp=s96-c"
      //     }
      //  }

      //tao account
      switch (role) {
        case "saler":
          await SalerService.createSaler(
            uid,
            name,
            email,
            phone,
            picture,
            null
          );
          break;
        case "customer":
          await CustomerService.createCustomer(
            uid,
            name,
            email,
            phone,
            picture,
            address
          );
          break;
        default:
          console.log("_____role sai");
          return res.status(400).json({
            status: 400,
            message: "________Tao moi tai khoan that bai!",
          });
      }
      console.log("______(signup) success!");
      return res.status(200).json({
        status: 200,
        message: "Tao moi tai khoan thanh cong!",
      });
    } catch (error) {
      console.log("________(signup) fail!");
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },
};
