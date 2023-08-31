const CreatorService = require("../services/SalerService");
const Firebase = require("../services/Firebase");
const mail = require("../services/mail");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Creator']
         #swagger.description = "Get all creator of agency"
        */
    try {
      const idagency = req.query.idagency;
      let data = await CreatorService.getAll(idagency);

      return res.status(200).json({
        status: 200,
        message: "Get creator successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Khong lay duoc CreatorList");
      return res.status(400).json({
        status: 400,
        message: "Get creators fail!",
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Creator']
         #swagger.description = "Get a creator"
        */
    try {
      const idcreator = req.params.id;
      let data = await CreatorService.getOne(idcreator);

      return res.status(200).json({
        status: 200,
        message: "Get creator successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Khong lay duoc Creator");
      return res.status(400).json({
        status: 400,
        message: "Get creator fail!",
      });
    }
  },

  async updateStatus(req, res) {
    /* 
        #swagger.tags = ['Creator']
         #swagger.description = "status = false xin làm creator, true active, NULL bị khóa"
        */

    try {
      const id = req.params["id"];
      const status = req.query.status;
      let data = await CreatorService.updateStatus(id, status);

      if (status === "true") {
        let creator = await CreatorService.getOne(id);
        console.log(creator);
        mail.sendMail(creator.email);
      }

      return res.status(200).json({
        status: 200,
        message: "Message",
        data: data,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
