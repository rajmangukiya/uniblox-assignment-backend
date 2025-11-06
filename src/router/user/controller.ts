import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { CreateAdminRequest, CreateUserRequest, LoginUserRequest } from "./types";
import jwt from "jsonwebtoken";
import userQueries from "../../db/queries/user";

const createUser = async (req: Request<{}, {}, CreateUserRequest>, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    // validations
    if (userQueries.getUserByEmail(email)) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    userQueries.createUser(name, email, hashedPassword);

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request<{}, {}, LoginUserRequest>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = userQueries.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax'
    });


    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = userQueries.getAllUsers();

    return res.status(200).json({
      message: "Users retrieved successfully",
      count: users.length,
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }))
    });
  } catch (error) {
    next(error);
  }
};

const createAdmin = async (req: Request<{}, {}, CreateAdminRequest>, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, masterPassword } = req.body;

    if (masterPassword !== process.env.MASTER_PASSWORD) throw new Error("Invalid master password");
    if (userQueries.getUserByEmail(email)) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    userQueries.createUser(name, email, hashedPassword, true);

    return res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export default { createUser, loginUser, getAllUsers, createAdmin, getUser, logoutUser };