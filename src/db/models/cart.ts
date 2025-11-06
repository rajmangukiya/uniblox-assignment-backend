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

const cartsDB: Cart[] = [];

export { cartsDB, ProductWithQuantity, Cart };