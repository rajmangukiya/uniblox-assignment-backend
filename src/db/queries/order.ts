import { ProductWithQuantity } from "../models/cart";
import { ordersDB, Order } from "../models/order";
import { v4 as uuidv4 } from 'uuid';

const createOrder = (userId: string, productsWithQuantity: ProductWithQuantity[]) => {
    const order: Order = {
        id: uuidv4(),
        userId,
        products: productsWithQuantity,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    ordersDB.push(order);
    return order;
};  

const getOrdersByUserId = (userId: string) => {
    return ordersDB.filter(order => order.userId === userId);
};

export default { 
    createOrder,
    getOrdersByUserId,
};