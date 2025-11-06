type Coupon = {
    id: string;
    code: string;
    fixedDiscount: number;
    nThValue: number;
    createdAt: Date;
    updatedAt: Date;
};

const couponsDB: Coupon[] = [];

export { couponsDB, Coupon };