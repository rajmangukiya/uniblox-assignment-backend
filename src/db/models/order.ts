import { ProductWithQuantity } from "./cart";

type Order = {
    id: string;
    userId: string;
    products: ProductWithQuantity[];
    couponId?: string;
    createdAt: Date;
    updatedAt: Date;
    totalAmountAfterDiscount: number;
    discountAmount: number;
};

const ordersDB: Order[] = [];

export { ordersDB, Order };