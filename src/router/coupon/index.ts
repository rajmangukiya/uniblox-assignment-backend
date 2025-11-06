import express from "express";
import couponController from "./controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth({ isAdmin: true }), couponController.addCoupon);
router.get("/", auth({ isAdmin: true }), couponController.getCoupons);

export default router;  