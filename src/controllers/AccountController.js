const AccountService = require("../services/AccountService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Account']
         #swagger.description = "Get all Account"
        */
    try {
      let data = await AccountService.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Account successful!",
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
      console.log("____Cannot get Account");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Account']
         #swagger.description = "Get one Account (give vet_id)"
        */
    try {
      const id = req.params.id;
      let data = await AccountService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Account successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Account not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Account");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Account']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { email, password, phone, role, status } = req.body;

      // const url = await Firebase.uploadImage(file);
      // let data = await AccountService.createAccount(req.body, url);
      let data = await AccountService.createAccount(req.body);

      console.log("____Create Account Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Account Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Account Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Account']
         #swagger.description = "Update a Account (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await AccountService.updateAccount(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update Account Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Account Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Account Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Account']
         #swagger.description = "Delete Account (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await AccountService.deleteAccount(id);
      console.log("____Delete Account Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Account Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Account Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
