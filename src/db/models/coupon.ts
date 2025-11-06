type Coupon = {
    id: string;
    code: string;
    discount: number;
    createdAt: Date;
    updatedAt: Date;
};

const couponsDB: Coupon[] = [];

export { couponsDB, Coupon };