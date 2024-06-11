using CouponsClient.BC.Models;

namespace CouponsClient.API.DTOs
{
    public class CouponsSaleCartDTO
    {
        public int clientId { get; set; }
        public string cardNumber { get; set; }
        public decimal totalAmount { get; set; }
        public IEnumerable<CouponSaleDTO> couponsSale { get; set; }
    }
}
