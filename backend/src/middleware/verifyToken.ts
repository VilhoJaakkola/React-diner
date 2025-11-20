import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";


const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') { next(); }


  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Authentication failed: No token provided" });
      return
    }
    const token = authHeader.split(' ')[1]; // Convention is 'Bearer TOKEN'
    if (!token) {
      res.status(401).json({ message: "Authentication failed: invalid token format" });
      return
    }

    const decodedToken = jwt.verify(token, config.JWT_KEY) as JwtPayload;
    if (!decodedToken || typeof decodedToken !== 'object' || !decodedToken.id) {
      res.status(401).json({ message: "Authentication failed: invalid token payload" });
      return
    }
    next();

  } catch (error) {
    res.status(401).json("Authentication failed: ");
  }
}

export { verifyToken }