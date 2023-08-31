const ProductService = require("../services/ProductService");
const Firebase = require("../services/Firebase");

module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['Product']
         #swagger.description = "Filter product, required idcollection"
        */
    try {
      // const { limit, page, name, catename, status, min, max } = req.query;
      const { limit, page, name, catename, status, min, max } = req.query;
      // console.log("_____", catename);
      let products = await ProductService.getAll(req.query);

      return res.status(200).json({
        status: 200,
        message: "Get list products successful!",
        data: products,
      });
    } catch (error) {
      console.log("____Cannot get all products");
    }
  },

  async getAllProduct(req, res) {
    /* 
        #swagger.tags = ['Product']
         #swagger.description = "Get all Product"
        */
    try {
      let data = await ProductService.getAllProduct();

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

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Product']
         #swagger.description = "Get one Product"
        */
    try {
      const id = req.params.id;
      let data = await ProductService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get product successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Product not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get product");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Product']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { name, quantity, price, cateid, detail } = req.body;
      const listImage = [];
      req.files.forEach(async (file) => {
        const url = await Firebase.uploadImage(file);
        listImage.push(url);
      });

      await ProductService.createProduct(req.body, listImage);
      // let image ="https://cdn.shopify.com/s/files/1/0034/8759/6579/files/Black_large_logo.png?height=628&pad_color=fff&v=1614328540&width=1200&fbclid=IwAR2mUhBNanKugkGMIUThYS_9gCYlHaSyayw8Mc6KKKBQKox_CbOQlaoX7BM";
      // if (req.file) {
      //   image = await Firebase.uploadImage(req.file);
      // }
      // let data =  await ProductService.createProduct(req.body,image);

      console.log("____Create Product Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Product Successful!",
        // data: data,
      });
    } catch (err) {
      console.log("____Create Product Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Product']
         #swagger.description = "Update a product"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await ProductService.updateProduct(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update Product Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Product Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Product Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Product']
         #swagger.description = "Delete product"
        */
    try {
      const id = req.params["id"];

      let data = await ProductService.deleteProduct(id);
      console.log("____Delete Product Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Product Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Product Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
