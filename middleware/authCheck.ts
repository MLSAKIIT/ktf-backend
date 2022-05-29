import { NextFunction, Request, Response } from "express";
import { verifyToken } from "@utils";
import { DecodedIdToken } from "firebase-admin/lib/auth";

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers?.authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 401,
        error: "Access denied. No token provided",
      });
    }
    const bearerHeader = req.headers.authorization;
    const token = bearerHeader.split(" ")[1];
    const currentUser: DecodedIdToken = await verifyToken(token);
    if (!currentUser) {
      return res.status(401).json({
        status: 401,
        error: "Access denied. Invalid token",
      });
    }
    req.body.currentUser = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: "Access denied. Invalid token",
    });
  }
};
