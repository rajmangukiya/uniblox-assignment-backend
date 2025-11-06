import { Request, Response } from "express";
import { CreateOrderRequest } from "./types";
import productQueries from "../../db/queries/product";
import orderQueries from "../../db/queries/order";

const createOrder = async (req: Request<{}, {}, CreateOrderRequest>, res: Response) => {
  if (!req.user) throw new Error("Unauthorized");
  
  // validate user
  const user = req.user;
  if (!user) throw new Error("Unauthorized");

  const { products: productsWithQuantity } = req.body;
  
  // validate products
  productsWithQuantity.forEach(productWithQuantity => {
    const product = productQueries.getProductById(productWithQuantity.productId);
    if (!product) throw new Error("Invalid product id");
  });

  // create order
  const order = orderQueries.createOrder(user.id, productsWithQuantity);
  if (!order) throw new Error("Failed to create order");

  return res.status(200).json({ message: "Order created successfully" });
};

const getOrders = async (req: Request, res: Response) => {
  // validate user
  const user = req.user;
  if (!user) throw new Error("Unauthorized");

  const userOrders = orderQueries.getOrdersByUserId(user.id);
  if (!userOrders) throw new Error("No orders found");

  return res.status(200).json({
    message: "Orders retrieved successfully",
    orders: userOrders,
  });
}

export default { createOrder, getOrders };