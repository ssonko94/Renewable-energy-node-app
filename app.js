const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoute");
const errorResponder = require("./utils/error");

const PORT = 8080;
const DATABASEURI =
  "mongodb+srv://MubiruIsaac:YJ9VPGQFRy2qEb5i@renewableenergy.tur0voc.mongodb.net/renewableEnergy?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(authRoutes);

app.use(errorResponder);

mongoose
  .connect(DATABASEURI)
  .then((result) => {
    app.listen(PORT);
    console.log("connected successfully!");
  })
  .catch((error) => {
    console.log(error);
  });
