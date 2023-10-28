const ServicePackageService = require("../services/ServicePackageService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['ServicePackageService']
         #swagger.description = "Get all ServicePackageService of service, truyeenf 1 trong 3 truong haoc ko truyen"
        */
    try {
      const bird_size_id = req.query.size_id;
      const service_id = req.query.service_id;
      const service_type_id = req.query.service_type_id;
      let data = await ServicePackageService.getAll(
        bird_size_id,
        service_id,
        service_type_id
      );

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get ServicePackageService successful!",
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
      console.log("____Cannot get ServicePackageService", error);
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['ServicePackageService']
         #swagger.description = "Get one ServicePackageService (give service_package_id)"
        */
    try {
      const id = req.params.id;
      let data = await ServicePackageService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get ServicePackageService successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "ServicePackageService not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get ServicePackageService");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['ServicePackageService']

    try {
      const {
        bird_size_id,
        service_id,
        price,
        description,
        package_name,
        status,
      } = req.body;

      //   const url = await Firebase.uploadImage(file);
      //   let data = await ServicePackageService.createServicePackageService(req.body, url);
      let data = await ServicePackageService.createServicePackageService(
        req.body
      );

      console.log("____Create ServicePackageService Successful");

      return res.status(200).json({
        status: 200,
        message: "Create ServicePackageService Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create ServicePackageService Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['ServicePackageService']
         #swagger.description = "Update a ServicePackageService (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await ServicePackageService.updateServicePackageService(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update ServicePackageService Successful");

      return res.status(200).json({
        status: 200,
        message: "Update ServicePackageService Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update ServicePackageService Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['ServicePackageService']
         #swagger.description = "Delete ServicePackageService (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await ServicePackageService.deleteServicePackageService(id);
      console.log("____Delete ServicePackageService Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete ServicePackageService Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete ServicePackageService Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
