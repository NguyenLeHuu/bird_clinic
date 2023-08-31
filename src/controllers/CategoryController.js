const { RedshiftData } = require("aws-sdk");
const CategoryService = require("../services/CategoryService");

module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['Category']
         #swagger.description = "Get all categories"
        */
    try {
      let data = await CategoryService.getAll();
      return res.status(200).json({
        status: 200,
        message: "Get list categories successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Cannot get all categories ");
    }
  },

  async store(req, res) {
    /* 
        #swagger.tags = ['Category']
         #swagger.description = "Create new category"
        */
    try {
      const name = req.body.name;
      const salerid = req.body.salerid;
      let data = await CategoryService.createCategory(name, salerid);
      console.log("____Create Category Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Category Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Category Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Category']
         #swagger.description = "Delete category"
        */
    try {
      const id = req.params["id"];

      let data = await CategoryService.deleteCategory(id);
      console.log("____Delete Category Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Category Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Category Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Category']
         #swagger.description = "Update a category"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;

      let data = await CategoryService.updateCategory(id, name);
      console.log("____Update Category Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Category Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Category Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
