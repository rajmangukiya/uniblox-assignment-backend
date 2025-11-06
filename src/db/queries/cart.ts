import { cartsDB, ProductWithQuantity } from "../models/cart";
import { v4 as uuidv4 } from 'uuid';
import { Cart } from "../models/cart";

const createCart = (userId: string) => {
    const cart: Cart = {
        id: uuidv4(),
        userId,
        products: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    cartsDB.push(cart);
    return cart;
};

const getCartByUserId = (userId: string) => {
    return cartsDB.find(cart => cart.userId === userId);
};

const updateUserCart = (userId: string, cart: Cart) => {
    cartsDB.map(c => c.userId === userId ? cart : c);
};

export default { createCart, getCartByUserId, updateUserCart };