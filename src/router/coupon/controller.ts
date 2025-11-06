import { Request, Response } from "express";
import couponQueries from "../../db/queries/coupon";
import { AddCouponRequest } from "./types";

const addCoupon = async (req: Request<{}, {}, AddCouponRequest>, res: Response) => {
  try {
    
    const { code, fixedDiscount, nThValue } = req.body;
    const existingCoupon = couponQueries.getCouponByCode(code);
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon already exists" });
    }
    couponQueries.createCoupon(code, fixedDiscount, nThValue);
    
    return res.status(200).json({ message: "Coupon added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add coupon" });
  }
};

const getCoupons = async (req: Request, res: Response) => {
  const coupons = couponQueries.getAllCoupons();
  
  return res.status(200).json({
    message: "Coupons retrieved successfully",
    coupons
  });
};

export default { addCoupon, getCoupons };