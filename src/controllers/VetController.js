const VetService = require("../services/VetService");
const Firebase = require("../services/Firebase");

module.exports = {
  // async index(req, res) {
  //   /*
  //       #swagger.tags = ['Vet']
  //        #swagger.description = "Filter Vet, required idcollection"
  //       */
  //   try {
  //     // const { limit, page, name, catename, status, min, max } = req.query;
  //     const { limit, page, name, catename, status, min, max } = req.query;
  //     // console.log("_____", catename);
  //     let Vets = await VetService.getAll(req.query);

  //     return res.status(200).json({
  //       status: 200,
  //       message: "Get list Vets successful!",
  //       data: Vets,
  //     });
  //   } catch (error) {
  //     console.log("____Cannot get all Vets");
  //   }
  // },

  async getAll(req, res) {
    /* 
        #swagger.tags = ['Vet']
         #swagger.description = "Get all Vet"
        */
    try {
      const id = req.params.id;
      let data = await VetService.getAll(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Vet successful!",
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
      console.log("____Cannot get Vet");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Vet']
         #swagger.description = "Get one Vet (give vet_id)"
        */
    try {
      const id = req.params.id;
      let data = await VetService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Vet successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Vet not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Vet");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Vet']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { account_id, specialized, name, status, image } = req.body;

      const url = await Firebase.uploadImage(file);
      let data = await VetService.createVet(req.body, url);

      console.log("____Create Vet Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Vet Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Vet Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Vet']
         #swagger.description = "Update a Vet (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await VetService.updateVet(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update Vet Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Vet Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Vet Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Vet']
         #swagger.description = "Delete Vet (give veterinarian_id)"
        */
    try {
      const id = req.params["id"];

      let data = await VetService.deleteVet(id);
      console.log("____Delete Vet Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Vet Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Vet Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
