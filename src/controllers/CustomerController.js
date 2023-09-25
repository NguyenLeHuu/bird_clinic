const CustomerService = require("../services/CustomerService");
const Firebase = require("../services/Firebase");

module.exports = {
  // async index(req, res) {
  //   /*
  //       #swagger.tags = ['Customer']
  //        #swagger.description = "Filter Customer, required idcollection"
  //       */
  //   try {
  //     // const { limit, page, name, catename, status, min, max } = req.query;
  //     const { limit, page, name, catename, status, min, max } = req.query;
  //     // console.log("_____", catename);
  //     let Customers = await CustomerService.getAll(req.query);

  //     return res.status(200).json({
  //       status: 200,
  //       message: "Get list Customers successful!",
  //       data: Customers,
  //     });
  //   } catch (error) {
  //     console.log("____Cannot get all Customers");
  //   }
  // },

  async getAll(req, res) {
    /* 
        #swagger.tags = ['Customer']
         #swagger.description = "Get all Customer of 1 customer (give customerid)"
        */
    try {
      const id = req.params.id;
      let data = await CustomerService.getAll(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Customer successful!",
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
      console.log("____Cannot get Customer");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Customer']
         #swagger.description = "Get one Customer (give Customer_id)"
        */
    try {
      const id = req.params.id;
      let data = await CustomerService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Customer successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Customer not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Customer");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Customer']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { account_id, email, address, name, status, phone, image } =
        req.body;

      const url = await Firebase.uploadImage(file);
      let data = await CustomerService.createCustomer(req.body, url);

      console.log("____Create Customer Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Customer Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Customer Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Customer']
         #swagger.description = "Update a Customer (give Customer_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await CustomerService.updateCustomer(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update Customer Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Customer Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Customer Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Customer']
         #swagger.description = "Delete Customer (give Customer_id)"
        */
    try {
      const id = req.params["id"];

      let data = await CustomerService.deleteCustomer(id);
      console.log("____Delete Customer Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Customer Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Customer Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
