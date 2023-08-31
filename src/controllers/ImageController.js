const AWS = require("aws-sdk");
const ImageService = require("../services/ImageService");

AWS.config.update({ region: "us-east-1" });
let s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;

module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['Image']
         #swagger.description = "Get all images"
        */
    try {
      let data = await ImageService.getAll();

      return res.status(200).json({
        status: 200,
        message: "Get list images successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Cannot get all images");
      throw error;
    }
  },
  async create(req, res) {
    /* 
        #swagger.tags = ['Image']
         #swagger.description = "Upload new image"
        */
    try {
      let imageAddress = "";
      const idproduct = req.body.idproduct;
      const idfeedback = req.body.idfeedback;
      const idcollection = req.body.idcollection;
      const file = req.files.file;
      const uploadParams = {
        Bucket: "swd-upload-images",
        Key:
          "collection-" +
          idcollection +
          "/product-" +
          idproduct +
          "/feedback-" +
          idfeedback +
          "/" +
          file.name,
        Body: Buffer.from(file.data),
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      s3.upload(uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Upload successful");
          imageAddress = data.Location.toString();
          ImageService.createImage(
            idcollection,
            idproduct,
            idfeedback,
            imageAddress
          );
        }
      });

      return res.send("___Upload successfully");
    } catch (error) {
      console.log("____Cannot create image");
      throw error;
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['Image']
         #swagger.description = "Delete image"
        */
    try {
      const id = req.params["id"];

      let data = await ImageService.deleteImage(id);
      console.log("____Delete Image Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete Image Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete Image Failed");
      throw err;
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['Image']
         #swagger.description = "Update image"
        */
    try {
      let imageAddress = "";
      const idproduct = req.body.idproduct;
      const idfeedback = req.body.idfeedback;
      const idimage = req.params["id"];
      const file = req.files.file;
      const uploadParams = {
        Bucket: "swd-upload-images",
        Key:
          "product-" +
          idproduct +
          "/" +
          "feedback-" +
          idfeedback +
          "/" +
          file.name,
        Body: Buffer.from(file.data),
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      s3.upload(uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Upload successful");
          imageAddress = data.Location.toString();
          ImageService.updateImage(idimage, imageAddress);
        }
      });

      return res.send("___Update successfully");
    } catch (error) {
      console.log("____Cannot update image");
      throw error;
    }
  },
};
