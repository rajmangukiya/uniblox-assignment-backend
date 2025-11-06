import { Request } from "express";
import { User } from "./db/models/user";
import { ZodObject } from "zod";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface RequestValidators {
  params?: ZodObject<any>;
  body?: ZodObject<any>;
  query?: ZodObject<any>;
}
