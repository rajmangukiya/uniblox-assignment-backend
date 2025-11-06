import express from "express";
import productController from "./controller";
import auth from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/requestValidator";
import { AddProductRequest } from "./types";

const router = express.Router();

router.post("/", auth({ isAdmin: true }), validateRequest({ body: AddProductRequest }), productController.addProduct);
router.get("/", auth({ isAdmin: false }), productController.getProducts);

export default router;  