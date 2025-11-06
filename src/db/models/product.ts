import { v4 as uuidv4 } from 'uuid';

type Product = {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
};

const productsDB: Product[] = [
    {
        id: uuidv4(),
        "title": "Wireless Noise Cancelling Headphones",
        "description": "Over-ear Bluetooth headphones with active noise cancellation and 30 hours of battery life.",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        "price": 12999,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        "title": "Smart Fitness Watch",
        "description": "Track your workouts, heart rate, sleep, and more with this waterproof fitness smartwatch.",
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        "price": 4999,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        "title": "Ergonomic Office Chair",
        "description": "Adjustable mesh office chair with lumbar support and smooth-rolling wheels for daily comfort.",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
        "price": 8999,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        "title": "4K Ultra HD Smart TV",
        "description": "55-inch LED Smart TV with 4K HDR, built-in Wi-Fi, and streaming apps preloaded.",
        "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop",
        "price": 45999,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];

export { productsDB, Product };