import express from "express";

import {
  registerDevice,
  deleteDevice,
  updateDevice,
  getDevicesForUser,
} from "../controllers/deviceController";

const deviceRouter = express.Router();

deviceRouter.post("/registerDevice", registerDevice);
deviceRouter.delete("/deleteDevice", deleteDevice);
deviceRouter.put("/updateDevice", updateDevice);
deviceRouter.get("/getAll", getDevicesForUser);

export default deviceRouter;
