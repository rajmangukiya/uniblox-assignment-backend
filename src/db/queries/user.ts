import { usersDB, User } from "../models/user";
import { v4 as uuidv4 } from 'uuid';

const createUser = async (name: string, email: string, password: string, isAdmin: boolean = false) => {
    const user: User = {
        id: uuidv4(),
        name,
        email,
        password,
        isAdmin,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    usersDB.push(user);
};

const getUserById = (id: string) => {
    const user = usersDB.find(user => user.id === id);
    return user;
};

const getUserByEmail = (email: string) => {
    const user = usersDB.find(user => user.email === email);
    return user;
};

const getAllUsers = () => {
    return usersDB;
};

export default { 
    createUser,
    getUserById,
    getUserByEmail,
    getAllUsers,
};