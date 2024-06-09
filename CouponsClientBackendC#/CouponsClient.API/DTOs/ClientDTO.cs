namespace CouponsClient.API.DTOs
{
    public class ClientDTO
    {
        public int clientId { get; set; }
        public string dni { get; set; }
        public string name { get; set; }
        public string lastname { get; set; }
        public DateTime birthDate { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
