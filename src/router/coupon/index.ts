import express from "express";
import couponController from "./controller";
import auth from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/requestValidator";
import { AddCouponRequest } from "./types";

const router = express.Router();

router.post("/", auth({ isAdmin: true }), validateRequest({ body: AddCouponRequest }), couponController.addCoupon);
router.get("/", auth({ isAdmin: true }), couponController.getCoupons);

export default router;  