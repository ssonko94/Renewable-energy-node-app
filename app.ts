require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoute");
import deviceRouter from "./routes/deviceRoute";
const errorResponder = require("./utils/error");

const PORT = process.env.PORT || 8080;
const DATABASEURI = process.env.DATABASE_URL;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRouter);

app.use(errorResponder);

mongoose
  .connect(DATABASEURI)
  .then(() => {
    app.listen(PORT);
    console.log("connected successfully!");
  })
  .catch((error: Error) => {
    console.log(error);
  });

export { app };
