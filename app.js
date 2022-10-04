const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const PORT = 8080;
const DATABASEURI =
  "mongodb+srv://MubiruIsaac:YJ9VPGQFRy2qEb5i@renewableenergy.tur0voc.mongodb.net/renewableEnergy?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(authRoutes);

app.use((error, req, res, next) => {
  console.log(error);

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(DATABASEURI)
  .then((result) => {
    app.listen(PORT);
    console.log("connected successfully!");
  })
  .catch((error) => {
    console.log(error);
  });
