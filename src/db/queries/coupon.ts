import { couponsDB, Coupon } from "../models/coupon";
import { v4 as uuidv4 } from 'uuid';

const createCoupon = (code: string, percentageDiscount: number, nThValue: number) => {
    const coupon: Coupon = {
        id: uuidv4(),
        code,
        percentageDiscount,
        nThValue,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    couponsDB.push(coupon);
};

const getCouponByCode = (code: string): Coupon | null => {
    const coupon = couponsDB.find(coupon => coupon.code === code);
    return coupon || null;
};

const getAllCoupons = (): Coupon[] => {
    return couponsDB;
};

const getCouponById = (id: string): Coupon | null => {
    const coupon = couponsDB.find(coupon => coupon.id === id);
    return coupon || null;
};

export default { createCoupon, getCouponByCode, getAllCoupons, getCouponById };