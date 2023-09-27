const BillService = require("../services/BillService");
const Firebase = require("../services/Firebase");

module.exports = {
  // async index(req, res) {
  //   /*
  //       #swagger.tags = ['Bill']
  //        #swagger.description = "Filter bird, required idcollection"
  //       */
  //   try {
  //     // const { limit, page, name, catename, status, min, max } = req.query;
  //     const { limit, page, name, catename, status, min, max } = req.query;
  //     // console.log("_____", catename);
  //     let birds = await BillService.getAll(req.query);

  //     return res.status(200).json({
  //       status: 200,
  //       message: "Get list birds successful!",
  //       data: birds,
  //     });
  //   } catch (error) {
  //     console.log("____Cannot get all birds");
  //   }
  // },

  async getAll(req, res) {
    /* 
        #swagger.tags = ['Bill']
         #swagger.description = "Get all Bill of 1 customer (give customerid)"
        */
    try {
      const id = req.params.id;
      let data = await BillService.getAll(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get bird successful!",
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
      console.log("____Cannot get bird");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Bill']
         #swagger.description = "Get one Bill (give bird_id)"
        */
    try {
      const id = req.params.id;
      let data = await BillService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get bird successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Bill not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get bird");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Bill']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const {
        customer_id,
        name,
        gender,
        hatching_date,
        ISO_microchip,
        weight,
        color,
        breed,
        status,
        image,
        size,
      } = req.body;

      const url = await Firebase.uploadImage(file);
      let data = await BillService.createBill(req.body, url);

      console.log("____Create Bill Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Bill Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Bill Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Bill']
         #swagger.description = "Update a bird (give bird_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await BillService.updateBill(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
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
         #swagger.description = "Delete bird (give bird_id)"
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
