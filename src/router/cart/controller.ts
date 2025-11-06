import { Request, Response } from "express";
import { UpdateCartRequest } from "./types";
import userQueries from "../../db/queries/user";
import cartQueries from "../../db/queries/cart";
import productQueries from "../../db/queries/product";
import { productsDB } from "../../db/models/product";

const updateCart = async (req: Request<{}, {}, UpdateCartRequest>, res: Response) => {
  // validate user
  const user = req.user;
  if (!user) throw new Error("Unauthorized");

  const { product: productWithQuantity } = req.body;

  // validate products
  const product = productQueries.getProductById(productWithQuantity.productId);
  if (!product) throw new Error("Invalid product id");

  // get or create cart & add product to cart
  const cart = cartQueries.getCartByUserId(user.id) || cartQueries.createCart(user.id);

  // if not already there then push the product to the cart
  const cartProduct = cart.products.find(p => p.productId === productWithQuantity.productId);
  if (!cartProduct) {
    cart.products.push({ productId: productWithQuantity.productId, quantity: productWithQuantity.quantity });
  } else {
    cart.products = cart.products
      .map(p => p.productId === productWithQuantity.productId ? { ...p, quantity: productWithQuantity.quantity } : p)
      .filter(p => p.quantity > 0);
  }
  
  return res.status(200).json({ message: "Cart updated successfully" });
};

const getCart = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) throw new Error("Unauthorized");

  const cart = cartQueries.getCartByUserId(user.id);
  if (!cart) throw new Error("Cart not found");

  cart.products = cart.products.map(p => ({
    ...p,
    product: productQueries.getProductById(p.productId),
  }));

  return res.status(200).json({
    message: "Cart retrieved successfully",
    cart: cart,
  });
};

const clearCart = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) throw new Error("Unauthorized");

  cartQueries.clearCartByUserId(user.id);
  return res.status(200).json({ message: "Cart cleared successfully" });
};

export default { updateCart, getCart, clearCart };