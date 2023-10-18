const http = require("http");

// const fs = require("fs");

const express = require("express");

const bodyParser = require("body-parser");

const route = require("./src/route/Route");

const cors = require("cors");

const swaggerUI = require("swagger-ui-express");

const swaggerFile = require("./swagger_output.json");

// const paypal = require("paypal-rest-sdk");

require("dotenv").config(); // get value from .env

let app = express();
app.use(cors({ origin: true }));

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// paypal.configure({
//   mode: "sandbox", //sandbox or live
//   client_id:
//     "AYAzJhgEv8eAYdypu-Q_9N06vD2JcR5qeRkz6G32J7nVJ6MCvEF7fCr4KIgAGocKfxzLk5RI33aHarDG",
//   client_secret:
//     "EB5yajw5uYXV53u27wrY_wg3DFSSSfAmRj1we1ZElIjZO8z1Dt1jRFpzQq0iFGZA3bquSHKf_QyDwove",
// });
app.get("/", function (req, res) {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send("<h1>Làm bài chăm chỉ lên mấy thằng nhóc</h1>");
});
app.use("/", route);

let port = process.env.PORT || 3000; // use process.env to get value from .env

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    statusCode: 500,
    message: err.message,
  });
});

var server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server start port http://localhost:${port}`);
});
