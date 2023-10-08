const https = require("https");

const fs = require("fs");

const express = require("express");

const bodyParser = require("body-parser");

const route = require("./route/Route");

const cors = require("cors");

const swaggerUI = require("swagger-ui-express");

const swaggerFile = require("./swagger_output.json");

const paypal = require("paypal-rest-sdk");

require("dotenv").config(); // get value from .env

let app = express();
app.use(cors({ origin: true }));

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AYAzJhgEv8eAYdypu-Q_9N06vD2JcR5qeRkz6G32J7nVJ6MCvEF7fCr4KIgAGocKfxzLk5RI33aHarDG",
  client_secret:
    "EB5yajw5uYXV53u27wrY_wg3DFSSSfAmRj1we1ZElIjZO8z1Dt1jRFpzQq0iFGZA3bquSHKf_QyDwove",
});
app.get("/", function (req, res) {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send("<h1>CMMMMMMM</h1>");
});
app.use("/", route);

let port = process.env.PORT || 4001; // use process.env to get value from .env

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    statusCode: 500,
    message: err.message,
  });
});

const useHttps = process.env.HTTPS || false;

// let certPath = process.env.CERT_PATH;
let keyPath = require("./config/clinicsystem.io.vn.key");

if (useHttps === "false") {
  try {
    https
      .createServer
      // Provide the private and public key to the server by reading each
      // file's content with the readFileSync() method.
      // {
      //   key: fs.readFileSync(require("./config/key.txt")),
      //   cert: fs.readFileSync(require("./config/clinicsystem.io.vn.crt")),
      //   ca: fs.readFileSync(
      //     require("./config/clinicsystem.io.vn.ca_bundle.crt")
      //   ),
      // },
      // app
      ()
      .listen(port, () => {
        console.log(
          // `Server start port https://ec2-54-169-148-196.ap-southeast-1.compute.amazonaws.com:${port}`
          `Server start port https://clinicsystem.io.vn:${port}`
        );
      });
  } catch (error) {
    console.log(error);
  }
} else {
  app.listen(port, () => {
    console.log(`Server start port http://localhost:${port}`);
  });
}
