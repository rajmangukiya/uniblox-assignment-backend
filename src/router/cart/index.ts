import express from "express";
import cartController from "./controller";
import auth from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/requestValidator";
import { UpdateCartRequest } from "./types";

const router = express.Router();

router.post("/update-cart", auth({ isAdmin: false }), validateRequest({ body: UpdateCartRequest }), cartController.updateCart);
router.post("/clear-cart", auth({ isAdmin: false }), cartController.clearCart);
router.get("/", auth({ isAdmin: false }), cartController.getCart);

export default router;  