import express from "express";
import userRouter from "./user";
import auth from "../middlewares/auth";
import cartRouter from "./cart";
import orderRouter from "./order";
import productRouter from "./product";
import couponRouter from "./coupon";
const router = express.Router();

router.use("/user", userRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/coupon", couponRouter);

export default router;