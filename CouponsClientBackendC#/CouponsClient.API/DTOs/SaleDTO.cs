namespace CouponsClient.API.DTOs
{
    public class SaleDTO
    {
        public int saleId { get; set; }
        public int clientId { get; set; }
        public string cardNumber { get; set; }
        public DateTime saleDate { get; set; }
        public decimal totalAmount { get; set; }
    }
}
