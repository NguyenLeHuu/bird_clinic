const ChatService = require("../services/ChatService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['chat']
         #swagger.description = "Get all Chat  "
        */
    try {
      // const type = req.query.type;
      // const type_id = req.query.type_id;
      let data = await ChatService.getAll();

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
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['chat']
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
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['chat']

    try {
      const { boarding_id, bird_id, customer_id } = req.body;

      // const url = await Firebase.uploadImage(file);
      let data = await ChatService.createChat(req.body);

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
        #swagger.tags = ['chat']
         #swagger.description = "Update a Chat (give Chat_id)"
        */
    try {
      const id = req.params["id"];
      const { status } = req.body;

      let data = await ChatService.updateChat(id, req.body);
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
        #swagger.tags = ['chat']
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
