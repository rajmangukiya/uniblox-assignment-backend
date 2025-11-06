type ProductWithQuantity = {
    productId: string;
    quantity: number;
};

type Cart = {
    id: string;
    userId: string;
    products: ProductWithQuantity[];
    couponId?: string;
    createdAt: Date;
    updatedAt: Date;
};

let cartsDB: Cart[] = [];

const clearCartByUserIdDB = (userId: string) => {
    cartsDB = cartsDB.filter(c => c.userId !== userId);
};
export { cartsDB, ProductWithQuantity, Cart, clearCartByUserIdDB };