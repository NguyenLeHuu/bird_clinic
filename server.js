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
    //     origin: "http://localhost:3000",
    //     methods: ["GET", "POST"],
  },
});

const loggedInUsers = [];
io.on("connection", function (socket) {
  // console.log(socket.id);

  //login
  socket.on("login", (data) => {
    const user = { account_id: data?.account_id, socket_id: socket.id };
    const foundElement = loggedInUsers.find(
      (element) =>
        element.account_id === user.account_id &&
        element.socket_id === user.socket_id
    );
    if (!foundElement) {
      loggedInUsers.push(user);
    }
    console.log(loggedInUsers);
  });

  //chat
  socket.on("client-sent-message", (data) => {
    for (const value of loggedInUsers) {
      if (value.account_id === data.user2) {
        io.to(value.socket_id).emit("server-send-data", data); //gửi tới 1 thằng
        //io.sockets.emit("server-send-data", data); tắt cả socket
        //socket.broadcast.emit("server-send-data", data); tắt cả trừ th gửi
        //socket.emit("server-send-data", data); gửi tới bản thân
      }
    }
  });

  // console.log(io.sockets.adapter.rooms);
});
