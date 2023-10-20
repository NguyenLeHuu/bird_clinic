const ChatService = require("../services/ChatService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Chat']
         #swagger.description = "Get all Chat  "
        */
    try {
      const type = req.query.type;
      const type_id = req.query.type_id;
      let data = await ChatService.getAll(type, type_id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Chat successful!",
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
      console.log("____Cannot get Chat");
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['Chat']
         #swagger.description = "Get one Chat (give Chat_id)"
        */
    try {
      const id = req.params.id;
      let data = await ChatService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get Chat successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Chat not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get Chat");
      throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Chat']
    /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    try {
      const { type, type_id, link, is_before, is_after, type_service, status } =
        req.body;

      const url = await Firebase.uploadImage(file);
      let data = await ChatService.createChat(req.body, url);

      console.log("____Create Chat Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Chat Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Chat Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Chat']
         #swagger.description = "Update a Chat (give Chat_id)"
        */
    try {
      const id = req.params["id"];
      const name = req.body.name;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const mainimg = req.body.mainimg;
      const detail = req.body.detail;

      let data = await ChatService.updateChat(
        id,
        name,
        quantity,
        price,
        mainimg,
        detail
      );
      console.log("____Update Chat Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Chat Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Chat Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Chat']
         #swagger.description = "Delete Chat (give Chat_id)"
        */
    try {
      const id = req.params["id"];

      let data = await ChatService.deleteChat(id);
      console.log("____Delete Chat Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Chat Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Chat Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
