using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BC.Models
{
    public class CouponsSaleCart
    {
        public int ClientId { get; set; }
        public string CardNumber { get; set; }
        public decimal TotalAmount { get; set; }
        public IEnumerable<CouponSale> CouponsSale { get; set; }
    }
}
