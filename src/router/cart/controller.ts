import { Request, Response } from "express";
import { AddToCartRequest } from "./types";
import userQueries from "../../db/queries/user";
import cartQueries from "../../db/queries/cart";
import productQueries from "../../db/queries/product";
import { productsDB } from "../../db/models/product";

const addToCart = async (req: Request<{}, {}, AddToCartRequest>, res: Response) => {
  // validate user
  const user = req.user;
  if (!user) throw new Error("Unauthorized");

  const { products: productsWithQuantity } = req.body;

  console.log('productsDB', productQueries.getAllProducts());
  

  // validate products
  productsWithQuantity.forEach(productWithQuantity => {
    const product = productQueries.getProductById(productWithQuantity.productId);
    if (!product) throw new Error("Invalid product id");
  });

  // get or create cart & add product to cart
  const cart = cartQueries.getCartByUserId(user.id) || cartQueries.createCart(user.id);
  cart.products.push(...productsWithQuantity);

  // update cart
  cartQueries.updateUserCart(user.id, cart);

  return res.status(200).json({ message: "Product added to cart successfully" });
};

const getCart = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) throw new Error("Unauthorized");

  const cart = cartQueries.getCartByUserId(user.id);
  if (!cart) throw new Error("Cart not found");

  return res.status(200).json({
    message: "Cart retrieved successfully",
    cart: cart,
  });
};

export default { addToCart, getCart };