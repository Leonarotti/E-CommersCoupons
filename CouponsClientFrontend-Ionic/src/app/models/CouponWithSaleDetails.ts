export interface CouponWithSaleDetails {
    couponId: number;
    enterpriseId: number;
    enterprise: string;
    categoryId: number;
    category: string;
    name: string;
    img: string;
    location: string;
    regularPrice: number;
    percentage: number;
    quantity: number;
    subtotal: number;
    saleId: number;
    cardNumber: string;
    saleDate: string;
    totalAmount: number;
    showDetails?: boolean;
  }
  