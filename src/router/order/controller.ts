import { Request, Response } from "express";
import { CreateOrderRequest } from "./types";
import productQueries from "../../db/queries/product";
import orderQueries from "../../db/queries/order";
import cartQueries from "../../db/queries/cart";
import couponQueries from "../../db/queries/coupon";
import { Coupon } from "../../db/models/coupon";
import { Order } from "../../db/models/order";

const createOrder = async (req: Request<{}, {}, CreateOrderRequest>, res: Response) => {
  if (!req.user) throw new Error("Unauthorized");
  
  // validate user
  const user = req.user;
  if (!user) throw new Error("Unauthorized");

  const cart = cartQueries.getCartByUserId(user.id);
  if (!cart) throw new Error("Cart not found");

  let coupon: Coupon | null = null;
  
  // validate coupon
  if (req.body.couponCode) {
    coupon = couponQueries.getCouponByCode(req.body.couponCode);
    if (!coupon) return res.status(400).json({ message: "Invalid coupon code" });
    const couponId = coupon.id;

    const orders = orderQueries.getOrdersByUserId(user.id).slice(-coupon.nThValue);
    if (orders.length) {
      if (orders.find(order => order.couponId === couponId)) {
        return res.status(400).json({ message: `Coupon ${coupon.code} can be used after ${coupon.nThValue} orders` });
      }
    }
  }

  const totalAmount = cart.products.reduce((acc, product) => {
    const productData = productQueries.getProductById(product.productId);
    if (!productData) throw new Error("Product not found");
    
    return acc + product.quantity * productData.price;
  }, 0);

  const discountAmount = totalAmount * (coupon?.percentageDiscount || 0) / 100;

  orderQueries.createOrder(
    user.id, 
    cart.products, 
    totalAmount - discountAmount,
    discountAmount,
    coupon?.id,
  );

  cartQueries.clearCartByUserId(user.id);

  return res.status(200).json({ message: "Order created successfully" });
};

const getOrders = async (req: Request, res: Response) => {
  // validate user
  const user = req.user;
  if (!user) throw new Error("Unauthorized");

  const userOrders: (Order & { couponCode?: string })[] = orderQueries.getOrdersByUserId(user.id);
  if (!userOrders) throw new Error("No orders found");

  userOrders.map(order => {
    if (order.couponId) {
      const coupon = couponQueries.getCouponById(order.couponId);
      if (coupon) {
        order.couponCode = coupon.code;
      }
    }
    return order;
  });

  return res.status(200).json({
    message: "Orders retrieved successfully",
    orders: userOrders,
  });
}

const getAnalytics = async (req: Request, res: Response) => {
  // validate user
  const user = req.user;
  if (!user) throw new Error("Unauthorized");

  const itemPurchased = orderQueries.getItemsPurchasedCount();
  const totalRevenue = orderQueries.getTotalPurchasedAmount();

  const couponCodes = orderQueries.getAllAppliedCoupons();
  const totalDiscountAmount = orderQueries.getTotalDiscountAmount();

  return res.status(200).json({
    message: "Analytics retrieved successfully",
    itemPurchased: itemPurchased,
    totalRevenue: totalRevenue,
    couponCodes: couponCodes,
    totalDiscountAmount: totalDiscountAmount,
  });
}

export default { createOrder, getOrders, getAnalytics };