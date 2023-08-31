const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8080;
const app = express();

app.use(helmet(), morgan("tiny"), cors(), express.json());

app.get("/api", (req, res) => {
  res.json({
    message: "chay duoc roi",
  });
});

app.listen(port, () => {
  console.log(`sever is listening on port: ${port}`);
});
