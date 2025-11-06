import { productsDB, Product } from "../models/product";
import { v4 as uuidv4 } from 'uuid';

const createProduct = async (title: string, description: string, image: string, price: number) => {
    const product: Product = {
        id: uuidv4(),
        title,
        description,
        image,
        price,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    productsDB.push(product);
};

const getAllProducts = () => {
    return productsDB;
};

const getProductById = (id: string) => {
    return productsDB.find(product => product.id === id);
};

const getProductByTitle = (title: string) => {
    return productsDB.find(product => product.title === title);
};

export default { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    getProductByTitle,
};