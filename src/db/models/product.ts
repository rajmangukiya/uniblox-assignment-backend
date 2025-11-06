type Product = {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
};

const productsDB: Product[] = [];

export { productsDB, Product };