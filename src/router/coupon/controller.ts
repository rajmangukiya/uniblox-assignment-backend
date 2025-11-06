import { Request, Response } from "express";
import couponQueries from "../../db/queries/coupon";
import { AddCouponRequest } from "./types";

const addCoupon = async (req: Request<{}, {}, AddCouponRequest>, res: Response) => {
  const { code, fixedDiscount, nThValue } = req.body;
  const existingCoupon = couponQueries.getCouponByCode(code);
  if (existingCoupon) throw new Error("Coupon already exists");
  couponQueries.createCoupon(code, fixedDiscount, nThValue);
  return res.status(200).json({ message: "Coupon added successfully" });
};

const getCoupons = async (req: Request, res: Response) => {
  const coupons = couponQueries.getAllCoupons();
  
  return res.status(200).json({
    message: "Coupons retrieved successfully",
    coupons
  });
};

export default { addCoupon, getCoupons };