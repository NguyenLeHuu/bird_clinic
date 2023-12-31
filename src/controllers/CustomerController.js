const CustomerService = require("../services/CustomerService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['customer']
         #swagger.description = "Get all Customer of 1 customer (give customerid)"
        */
    try {
      let data = await CustomerService.getAll();

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
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['customer']
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
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['customer']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['image'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { account_id, email, address, name, status, phone } = req.body;
      let url =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJVSkk9RpoHe2r2kYU3n-LVUcPTh1vb0a32A&usqp=CAU";
      if (req.file) {
        url = await Firebase.uploadImage(req.file);
      }
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
        #swagger.tags = ['customer']
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
        #swagger.tags = ['customer']
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
