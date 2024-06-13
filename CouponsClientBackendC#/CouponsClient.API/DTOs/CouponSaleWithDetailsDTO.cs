namespace CouponsClient.API.DTOs
{
    public class CouponSaleWithDetailsDTO
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
        public int percentage { get; set; }
        public int quantity { get; set; }
        public decimal subtotal { get; set; }

        public int saleId { get; set; }
        public string cardNumber { get; set; }
        public DateTime saleDate { get; set; }
        public decimal totalAmount { get; set; }
    }
}
