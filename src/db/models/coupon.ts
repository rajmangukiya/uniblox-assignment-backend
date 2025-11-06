type Coupon = {
    id: string;
    code: string;
    percentageDiscount: number;
    nThValue: number;
    createdAt: Date;
    updatedAt: Date;
};

const couponsDB: Coupon[] = [];

export { couponsDB, Coupon };