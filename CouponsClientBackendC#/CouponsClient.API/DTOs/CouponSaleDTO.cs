namespace CouponsClient.API.DTOs
{
    public class CouponSaleDTO
    {
        public int couponId { get; set; }
        public int enterpriseId { get; set; }
        public string enterprise { get; set; }
        public int categoryId { get; set; }
        public string category { get; set; }
        public string name { get; set; }
        public string img { get; set; }
        public string location { get; set; }
        public decimal regularPrice { get; set; }
        public int percentageDiscount { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public int quantity { get; set; }
    }
}
