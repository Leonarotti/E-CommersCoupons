using CouponsClient.API.DTOs;
using CouponsClient.BC.Models;

namespace CouponsClient.API.Mappers
{
    public class CouponDTOMapper
    {
        public static CouponDTO CouponMapToCouponDTO(Coupon coupon)
        {
            return new CouponDTO
            {
                couponId = coupon.id_coupon,
                enterpriseId = coupon.id_enterprise,
                enterprise = coupon.enterprise,
                categoryId = coupon.id_category,
                category = coupon.category,
                name = coupon.name,
                img = coupon.img,
                location = coupon.location,
                regularPrice = coupon.regular_price,
                percentageDiscount = coupon.percentage,
                startDate = coupon.start_date,
                endDate = coupon.end_date
            };
        }

        public static IEnumerable<CouponDTO> CouponsMapToCouponsDTO(IEnumerable<Coupon> coupons)
        {
            List<CouponDTO> couponsDTO = new List<CouponDTO>();
            foreach (Coupon coupon in coupons)
            {
                couponsDTO.Add(CouponMapToCouponDTO(coupon));
            }
            return couponsDTO;
        }

        public static IEnumerable<CouponSaleWithDetailsDTO> CouponsSaleWithDetailsMapToCouponsSaleWithDetailsDTO(IEnumerable<CouponSaleWithDetails> couponsSaleWithDetails)
        {
            List<CouponSaleWithDetailsDTO> couponsSaleWithDetailsDTO = new List<CouponSaleWithDetailsDTO>();
            foreach (CouponSaleWithDetails couponSaleWithDetails in couponsSaleWithDetails)
            {
                couponsSaleWithDetailsDTO.Add(CouponSaleWithDetailsMapToCouponSaleWithDetailsDTO(couponSaleWithDetails));
            }
            return couponsSaleWithDetailsDTO;
        }

        public static CouponSaleWithDetailsDTO CouponSaleWithDetailsMapToCouponSaleWithDetailsDTO(CouponSaleWithDetails couponSaleWithDetails)
        {
            return new CouponSaleWithDetailsDTO
            {
                couponId = couponSaleWithDetails.CouponId,
                enterpriseId = couponSaleWithDetails.EnterpriseId,
                enterprise = couponSaleWithDetails.Enterprise,
                categoryId = couponSaleWithDetails.CategoryId,
                category = couponSaleWithDetails.Category,
                name = couponSaleWithDetails.Name,
                img = couponSaleWithDetails.Img,
                location = couponSaleWithDetails.Location,
                regularPrice = couponSaleWithDetails.RegularPrice,
                percentage = couponSaleWithDetails.Percentage,
                quantity = couponSaleWithDetails.Quantity,
                subtotal = couponSaleWithDetails.Subtotal,
                saleId = couponSaleWithDetails.SaleId,
                cardNumber = couponSaleWithDetails.CardNumber,
                saleDate = couponSaleWithDetails.SaleDate,
                totalAmount = couponSaleWithDetails.TotalAmount
            };
        }
    }
}
