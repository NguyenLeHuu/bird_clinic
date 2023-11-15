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
const initializeSocket = require("./src/services/Socket.io");
initializeSocket(io);

// let loggedInUsers = [];
// io.on("connection", function (socket) {
//   // console.log(socket.id);

//   //login
//   socket.on("login", (data) => {
//     const user = { account_id: data?.account_id, socket_id: socket.id };
//     const foundElement = loggedInUsers.find(
//       (element) =>
//         element.account_id === user.account_id &&
//         element.socket_id === user.socket_id
//     );
//     if (!foundElement) {
//       loggedInUsers.push(user);
//     }
//     console.log(loggedInUsers);
//   });

//   //chat
//   socket.on("client-sent-message", (data) => {
//     socket.emit("server-send-data_seft", data);
//     for (const value of loggedInUsers) {
//       if (
//         value.account_id === data.user2 &&
//         io.of("/").sockets.has(value.socket_id)
//       ) {
//         io.to(value.socket_id).emit("server-send-data", data); //gửi tới 1 thằng
//         //io.sockets.emit("server-send-data", data); tắt cả socket
//         //socket.broadcast.emit("server-send-data", data); tắt cả trừ th gửi
//         // io.sockets.emit("server-send-data", data);
//       }
//     }
//   });

//   //quýet check-in : bên app bảo gửi tới
//   socket.on("scan-check-in", (data) => {
//     //trong data bắt buộc có booking_id
//     //mặc định 1 staff làm công việc check-in có account "staff_check_in"
//     for (const value of loggedInUsers) {
//       if (
//         value.account_id === "staff_check_in" &&
//         io.of("/").sockets.has(value.socket_id)
//       ) {
//         io.to(value.socket_id).emit("server-scan-check-in", data); //gửi tới màn hình máy tính của staff_check_in

//         //bên phía long: bắt sự kiện -> data.booking_id -> hiện popup để có thể gán bác sĩ, check-in...
//       }
//     }
//   });

//   //confirm check-in : bên staff long gửi tới
//   socket.on("confirm-check-in", (data) => {
//     for (const value of loggedInUsers) {
//       if (io.of("/").sockets.has(value.socket_id)) {
//         //t1: gửi tới khách hàng
//         if (value.account_id === data.customer_id) {
//           io.to(value.socket_id).emit("server-confirm-check-in", data);
//           //bên phía bảo: bắt sự kiện render lại
//         } //t2: gửi tới bác sĩ phụ trách
//         if (value.account_id === data.veterinarian_id) {
//           io.to(value.socket_id).emit("server-confirm-check-in", data);
//           //bên phía long( bs phụ trách màn hình chờ khám): bắt sự kiện render lại
//         }
//       }
//     }
//   });

//   //thanh toán tiền
//   socket.on("complete-payment", (data) => {
//     for (const value of loggedInUsers) {
//       if (io.of("/").sockets.has(value.socket_id)) {
//         //t1: gửi tới khách hàng
//         if (value.account_id === data.customer_id) {
//           io.to(value.socket_id).emit("server-complete-payment", data);
//           //bên phía bảo: bắt sự kiện render lại
//         } //t2: gửi tới bác sĩ phụ trách
//         if (value.account_id === data.veterinarian_id) {
//           io.to(value.socket_id).emit("server-complete-payment", data);
//           //bên phía long bắt sự kiện render lại
//         } //t3: gửi tới bác sĩ nhỏ
//         if (data.vet.includes(value.account_id)) {
//           //vet là ds cac veterinarian_id cua bs con cua sf
//           io.to(value.socket_id).emit("server-complete-payment", data);
//           //bên phía long bắt sự kiện render lại
//         }
//       }
//     }
//   });

//   // console.log(io.sockets.adapter.rooms);
//   socket.on("disconnect", () => {
//     socket.disconnect();
//     const myArray = loggedInUsers.filter(
//       (item) => item.socket_id !== socket.id
//     );
//     loggedInUsers = myArray;
//     console.log("🔥: A user disconnected");
//     console.log(loggedInUsers);
//   });
// });
