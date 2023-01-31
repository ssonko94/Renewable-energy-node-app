import { Request, Response, NextFunction } from "express";

const errorWrapper =
  (func: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      return next(error);
    }
  };

export default errorWrapper;
