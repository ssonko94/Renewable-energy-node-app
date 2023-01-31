require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoute");
const errorResponder = require("./utils/error");

const PORT = process.env.PORT || 8080;
const DATABASEURI = process.env.DATABASE_URL;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(authRoutes);

app.use(errorResponder);

mongoose
  .connect(DATABASEURI)
  .then(() => {
    app.listen(PORT);
    console.log("connected successfully!");
  })
  .catch((error: any) => {
    console.log(error);
  });

export { app };
