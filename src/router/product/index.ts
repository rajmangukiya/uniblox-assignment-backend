import express from "express";
import productController from "./controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth({ isAdmin: true }), productController.addProduct);
router.get("/", auth({ isAdmin: false }), productController.getProducts);

export default router;  