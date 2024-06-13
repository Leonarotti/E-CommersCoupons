namespace CouponsClient.API.DTOs
{
    public class SaleDetailDTO
    {
        public int saleDetailId { get; set; }
        public int saleId { get; set; }
        public int couponId { get; set; }
        public decimal regularPrice { get; set; }
        public int percentage { get; set; }
        public int quantity { get; set; }
        public decimal subtotal { get; set; }
    }
}
