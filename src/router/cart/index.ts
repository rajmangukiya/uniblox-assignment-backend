import express from "express";
import cartController from "./controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/add-to-cart", auth({ isAdmin: false }), cartController.addToCart);
router.get("/", auth({ isAdmin: false }), cartController.getCart);

export default router;  