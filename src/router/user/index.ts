import express from "express";
import userController from "./controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/register-admin", userController.createAdmin);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getAllUsers); // Dev endpoint to view all users
router.get("/get-one", auth({ isAdmin: false }), userController.getUser); // Dev endpoint to view all users

export default router;  