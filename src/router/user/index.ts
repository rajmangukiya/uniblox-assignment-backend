import express from "express";
import userController from "./controller";
import auth from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/requestValidator";
import { CreateAdminRequest, CreateUserRequest, LoginUserRequest } from "./types";

const router = express.Router();

router.post("/register-admin", validateRequest({ body: CreateAdminRequest }), userController.createAdmin);
router.post("/register", validateRequest({ body: CreateUserRequest }), userController.createUser);
router.post("/login", validateRequest({ body: LoginUserRequest }), userController.loginUser);
router.get("/get-one", auth({ isAdmin: false }), userController.getUser);
router.post("/logout", auth({ isAdmin: false }), userController.logoutUser);


export default router;  