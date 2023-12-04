const VetServiceCatalog = require("../services/VetServiceCatalog");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['VetServiceCatalog']
         #swagger.description = "Get all VetServiceCatalog"
        */
    try {
      // const { service_id, service_type_id } = req.query;
      let data = await VetServiceCatalog.getAll();

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get VetServiceCatalog successful!",
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
      console.log("____Cannot get VetServiceCatalog", error);
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['VetServiceCatalog']
         #swagger.description = "Get one VetServiceCatalog (give vet_id)"
        */
    try {
      const id = req.params.id;
      let data = await VetServiceCatalog.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get VetServiceCatalog successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "VetServiceCatalog not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get VetServiceCatalog", error);
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['VetServiceCatalog']

    try {
      const { veterinarian_id, service_id, veterinarian_name, service_name } =
        req.body;

      if (Array.isArray(arr_service_id)) {
        arr_service_id.forEach(async (item, index) => {});
      }
      let data = await VetServiceCatalog.create(req.body);

      console.log("____Create VetServiceCatalog Successful");

      return res.status(200).json({
        status: 200,
        message: "Create VetServiceCatalog Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create VetServiceCatalog Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['VetServiceCatalog']
         #swagger.description = "Update a VetServiceCatalog (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      const { veterinarian_id, service_id, veterinarian_name, service_name } =
        req.body;
      let data = await VetServiceCatalog.update(id, req.body);
      console.log("____Update VetServiceCatalog Successful");

      return res.status(200).json({
        status: 200,
        message: "Update VetServiceCatalog Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update VetServiceCatalog Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['VetServiceCatalog']
         #swagger.description = "Delete VetServiceCatalog (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await VetServiceCatalog.delete(id);
      console.log("____Delete VetServiceCatalog Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete VetServiceCatalog Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete VetServiceCatalog Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
