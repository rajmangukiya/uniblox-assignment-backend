type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
};

const usersDB: User[] = [];

export { usersDB, User };