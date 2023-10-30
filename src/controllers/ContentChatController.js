const ContentChatService = require("../services/ContentChatService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['ContentChat']
         #swagger.description = "Get all ContentChat  "
        */
    try {
      const { chat_id, user1, user2 } = req.query;

      let data = await ContentChatService.getAll(req.query);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get ContentChat successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "No data",
          // data: data,
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error,
        // data: data,
      });
    }
  },

  async getOne(req, res) {
    /* 
        #swagger.tags = ['ContentChat']
         #swagger.description = "Get one ContentChat (give ContentChat_id)"
        */
    try {
      const id = req.params.id;
      let data = await ContentChatService.getOne(id);

      if (data != null) {
        return res.status(200).json({
          status: 200,
          message: "Get ContentChat successful!",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "ContentChat not exist!",
          data: data,
        });
      }
    } catch (error) {
      console.log("____Cannot get ContentChat");
      // throw error;
    }
  },

  async store(req, res) {
    // #swagger.tags = ['ContentChat']

    try {
      const { user1, user2, message, type, chat_id } = req.body;

      // const url = await Firebase.uploadImage(file);
      let data = await ContentChatService.createContentChat(req.body);

      console.log("____Create ContentChat Successful");

      return res.status(200).json({
        status: 200,
        message: "Create ContentChat Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create ContentChat Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['ContentChat']
         #swagger.description = "Update a ContentChat (give ContentChat_id)"
        */
    try {
      const id = req.params["id"];
      const { status } = req.body;

      let data = await ContentChatService.updateContentChat(id, req.body);
      console.log("____Update ContentChat Successful");

      return res.status(200).json({
        status: 200,
        message: "Update ContentChat Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update ContentChat Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['ContentChat']
         #swagger.description = "Delete ContentChat (give ContentChat_id)"
        */
    try {
      const id = req.params["id"];

      let data = await ContentChatService.deleteContentChat(id);
      console.log("____Delete ContentChat Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete ContentChat Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete ContentChat Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
