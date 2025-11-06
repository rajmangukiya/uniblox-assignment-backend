import { ProductWithQuantity } from "../models/cart";
import { ordersDB, Order } from "../models/order";
import { v4 as uuidv4 } from 'uuid';
import couponQueries from "./coupon";

const createOrder = (userId: string, productsWithQuantity: ProductWithQuantity[], totalAmountAfterDiscount: number, discountAmount: number, couponId?: string) => {
    const order: Order = {
        id: uuidv4(),
        userId,
        products: productsWithQuantity,
        couponId,
        createdAt: new Date(),
        updatedAt: new Date(),
        totalAmountAfterDiscount: totalAmountAfterDiscount,
        discountAmount: discountAmount,
    };
    ordersDB.push(order);
    return order;
};

const getOrdersByUserId = (userId: string) => {
    return ordersDB.filter(order => order.userId === userId);
};

const getItemsPurchasedCount = () => {
    return ordersDB.reduce((acc, order) => {
        return acc + order.products.reduce((acc, product) => {
            return acc + product.quantity;
        }, 0);
    }, 0);
};

const getTotalPurchasedAmount = () => {
    return ordersDB.reduce((acc, order) => {
        return acc + order.totalAmountAfterDiscount;
    }, 0);
};

const getAllAppliedCoupons = (): string[] => {
    const coupons: string[] = [];
    ordersDB.forEach(order => {
        if (order.couponId) {
            const coupon = couponQueries.getCouponById(order.couponId);
            if (coupon && !coupons.includes(coupon.code)) {
                coupons.push(coupon.code);
            }
        }
    });
    return coupons.sort();
};

const getTotalDiscountAmount = () => {
    return ordersDB.reduce((acc, order) => {
        return acc + order.discountAmount;
    }, 0);
};

export default {
    createOrder,
    getOrdersByUserId,
    getItemsPurchasedCount,
    getTotalPurchasedAmount,
    getAllAppliedCoupons,
    getTotalDiscountAmount
};