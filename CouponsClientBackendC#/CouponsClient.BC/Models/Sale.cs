using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BC.Models
{
    public class Sale
    {
        public int SaleId { get; set; }
        public int ClientId { get; set; }
        public string CardNumber { get; set; }
        public DateTime SaleDate { get; set; }
        public decimal Total { get; set; }
    }
}
