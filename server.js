const http = require("http");

// const fs = require("fs");

const express = require("express");

const bodyParser = require("body-parser");

const route = require("./src/route/Route");

const cors = require("cors");

const swaggerUI = require("swagger-ui-express");

const swaggerFile = require("./swagger_output.json");

const { Server } = require("socket.io");

// const paypal = require("paypal-rest-sdk");

require("dotenv").config(); // get value from .env

let app = express();
app.use(cors({ origin: true }));
app.disable("etag");
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
  res.send("<h1>SRC moi</h1>");
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
const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3001",
    // methods: ["GET", "POST"],
  },
});

io.on("connection", function (socket) {
  // console.log(socket.id);
  socket.on("client-sent-message", function (data) {
    io.sockets.emit("server-send-data", data);
  });

  //login
  //const loggedInUsers = [];
  // socket.on('login', (data) => {
  //   const user = { userid: data.userid, socket: socket };
  //   loggedInUsers.push(user);
  // });

  // Gửi tin nhắn từ userid1 cho userid2
  //client
  //socket.emit('message', { from: 'userid1', to: 'userid2', content: 'Nội dung tin nhắn' });

  //server
  //socket.on('message', (data) => {
  //lap vong for gui toi cac socket co userid
  // io.to().emit('message', { from: 'userid1', to: 'userid2',})
  //});

  //client
  //socket.on('message', (data) => {
  //goi lai api
  //});

  // console.log(io.sockets.adapter.rooms);
});
