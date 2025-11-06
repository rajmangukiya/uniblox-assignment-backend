import { Request, Response } from "express";
import productQueries from "../../db/queries/product";
import { AddProductRequest } from "./types";
import cartQueries from "../../db/queries/cart";
import { Product } from "../../db/models/product";

const addProduct = async (req: Request<{}, {}, AddProductRequest>, res: Response) => {
  const { products } = req.body;

  products.forEach(product => {
    const { title, description, image, price } = product;

    const existingProduct = productQueries.getProductByTitle(title);
    if (existingProduct) throw new Error("Product already exists");

    productQueries.createProduct(title, description, image, price);
  });

  return res.status(200).json({ message: "Products added successfully" });
};

const getProducts = async (req: Request, res: Response) => {
  const products = productQueries.getAllProducts();

  if (req.user && !req.user.isAdmin) {
    const cart = cartQueries.getCartByUserId(req.user.id);
    products.forEach((p: any) => {
      p["isInCart"] = cart?.products?.map(cp => cp.productId).includes(p.id);
    });
  }

  return res.status(200).json({
    message: "Products retrieved successfully",
    products
  });
};

export default { addProduct, getProducts };