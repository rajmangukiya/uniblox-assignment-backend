import express from "express";
import cartController from "./controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/update-cart", auth({ isAdmin: false }), cartController.updateCart);
router.post("/clear-cart", auth({ isAdmin: false }), cartController.clearCart);
router.get("/", auth({ isAdmin: false }), cartController.getCart);

export default router;  