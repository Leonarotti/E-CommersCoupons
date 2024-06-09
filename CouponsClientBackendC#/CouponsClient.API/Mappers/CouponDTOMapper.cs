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
                percentage = coupon.percentage,
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
    }
}
