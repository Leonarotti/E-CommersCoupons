using CouponsClient.API.DTOs;
using CouponsClient.BC.Models;

namespace CouponsClient.API.Mappers
{
    public class SaleDTOMapper
    {
        //public static CouponSaleDTO CouponSaleMapToCouponSaleDTO(CouponSale couponSale)
        //{
        //    return new CouponSaleDTO
        //    {
        //        couponId = couponSale.id_coupon,
        //        enterpriseId = couponSale.id_enterprise,
        //        enterprise = couponSale.enterprise,
        //        categoryId = couponSale.id_category,
        //        category = couponSale.category,
        //        name = couponSale.name,
        //        img = couponSale.img,
        //        location = couponSale.location,
        //        regularPrice = couponSale.regular_price,
        //        percentageDiscount = couponSale.percentage,
        //        startDate = couponSale.start_date,
        //        endDate = couponSale.end_date,
        //        quantity = couponSale.quantity
        //    };
        //}

        public static CouponSale CouponSaleDTOMapToCouponSale(CouponSaleDTO couponSaleDTO)
        {
            return new CouponSale
            {
                id_coupon = couponSaleDTO.couponId,
                id_enterprise = couponSaleDTO.enterpriseId,
                enterprise = couponSaleDTO.enterprise,
                id_category = couponSaleDTO.categoryId,
                category = couponSaleDTO.category,
                name = couponSaleDTO.name,
                img = couponSaleDTO.img,
                location = couponSaleDTO.location,
                regular_price = couponSaleDTO.regularPrice,
                percentage = couponSaleDTO.percentageDiscount,
                start_date = couponSaleDTO.startDate,
                end_date = couponSaleDTO.endDate,
                quantity = couponSaleDTO.quantity
            };
        }

        //public static CouponsSaleCartDTO CouponsSaleCartMapToCouponsSaleCartDTO(CouponsSaleCart couponsSaleCart)
        //{
        //    return new CouponsSaleCartDTO
        //    {
        //        clientId = couponsSaleCart.ClientId,
        //        cardNumber = couponsSaleCart.CardNumber,
        //        totalAmount = couponsSaleCart.TotalAmount,
        //        couponsSale = (IEnumerable<CouponSale>) couponsSaleCart.CouponsSale.Select(c => CouponSaleMapToCouponSaleDTO(c))
        //    };
        //}

        public static CouponsSaleCart CouponsSaleCartDTOMapToCouponsSaleCart(CouponsSaleCartDTO couponsSaleCartDTO)
        {
            return new CouponsSaleCart
            {
                ClientId = couponsSaleCartDTO.clientId,
                CardNumber = couponsSaleCartDTO.cardNumber,
                TotalAmount = couponsSaleCartDTO.totalAmount,
                CouponsSale = couponsSaleCartDTO.couponsSale.Select(c => CouponSaleDTOMapToCouponSale(c))
            };
        }

    }
}
