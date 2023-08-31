const SalerService = require("../services/SalerService");
const db = require("../models/index");

module.exports = {
  async getProductBySaler(req, res) {
    /* 
        #swagger.tags = ['Saler']
         #swagger.description = "Get all Product by Saleid"
        */
    try {
      const id = req.params.salerid;
      let data = await SalerService.getProductBySaler(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get product successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Cann not get product exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get product");
    }
  },

  async registerSaler(req, res) {
    /* 
        #swagger.tags = ['Saler']
        */
    const { name, email, username, password } = req.body;
    try {
      // Check if the username already exists
      const existingUser = await db.Saler.findOne({
        where: { username: username },
      });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Create a new user
      const data = await SalerService.registerSaler(
        name,
        email,
        username,
        password
      );
      res.status(200).json({ message: "Registration successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async loginSaler(req, res) {
    /* 
        #swagger.tags = ['Saler']
        */
    const { username, password } = req.body;
    try {
      // Check if the username exists
      const user = await db.Saler.findOne({ where: { username: username } });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Validate the password
      const isPasswordValid = user.password === password;
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Password is valid, generate and return an authentication token
      const token = "ABCDEFGHIJKLMNOPQRSTUVWXYZabc";
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
