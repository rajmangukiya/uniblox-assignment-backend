import { NextFunction, Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userQueries from "../db/queries/user";

// auth middleware is very minimal, can be improved in future by incrypting the cookie and verifying the token.
const auth = ({ isAdmin }: { isAdmin?: boolean }): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.token;
  
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token found in cookies" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { userId: string };

      const user = userQueries.getUserById(decoded.userId);

      if (!user) throw new Error("User not found");
      if (isAdmin && !user.isAdmin) throw new Error("Unauthorized: User is not an admin");

      req.user = user
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
    }
  };
}

export default auth;