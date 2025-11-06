import { ProductWithQuantity } from "./cart";

type Order = {
    id: string;
    userId: string;
    products: ProductWithQuantity[];
    couponId?: string;
    createdAt: Date;
    updatedAt: Date;
};

const ordersDB: Order[] = [];

export { ordersDB, Order };