import { NextFunction, Request, Response } from "express";

export const adminCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Access denied. Invalid token",
    });
  }
};
