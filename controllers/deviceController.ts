import { NextFunction, Request, Response } from "express";
import { Device, DeviceDocument } from "../models/device";
import { UserDocument } from "../models/user";
import errorWrapper from "../utils/errorWrapper";

interface RequestDocument extends Express.Request {
  user: UserDocument;
  body: DeviceDocument;
}

// Controller for registering a device
export const registerDevice = errorWrapper(
  async (req: RequestDocument, res: Response) => {
    const { deviceName, deviceType, deviceImei, location } = req.body;
    const owner = req.user._id; // Assuming user is authenticated and their id is in the request object

    const device: DeviceDocument = new Device({
      deviceName,
      deviceType,
      deviceImei,
      location,
      owner,
    });

    await device.save();
    res.status(201).json({ message: "Device registered successfully", device });
  }
);

// Controller for getting all devices for a specific user
export const getDevicesForUser = errorWrapper(
  async (req: RequestDocument, res: Response) => {
    const owner = req.user._id; // Assuming user is authenticated and their id is in the request object
    const devices = await Device.find({ owner });

    res.status(200).json({
      status: "success",
      devices,
    });
  }
);

// Controller for deleting a device
export const deleteDevice = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const deviceId = req.params.id;
    const device = await Device.findById(deviceId);

    if (!device) {
      res.status(404).json({ message: "Device not found" });
      return next("Device not found");
    }

    await device.remove();
    res.status(200).json({ message: "Device deleted successfully" });
  }
);

// Controller for updating a device
export const updateDevice = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const deviceId = req.params.id;
    const { deviceName, deviceType, deviceImei, location } = req.body;
    const device = await Device.findById(deviceId);

    if (!device) {
      res.status(404).json({ message: "Device not found" });
      return next("Device not found");
    }

    device.deviceName = deviceName || device.deviceName;
    device.deviceType = deviceType || device.deviceType;
    device.deviceImei = deviceImei || device.deviceImei;
    device.location = location || device.location;

    await device.save();
    res.status(200).json({ message: "Device updated successfully", device });
  }
);
