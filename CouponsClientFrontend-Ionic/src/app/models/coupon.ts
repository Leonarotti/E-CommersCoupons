export interface Coupon {
    couponId: number;
    enterpriseId: number;
    enterprise: string;
    categoryId: number;
    category: string;
    name: string;
    img: string;
    location: string;
    regularPrice: number;
    percentageDiscount: number;
    startDate: Date;
    endDate: Date;
}