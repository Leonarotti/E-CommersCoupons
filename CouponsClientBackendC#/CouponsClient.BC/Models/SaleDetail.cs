using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BC.Models
{
    public class SaleDetail
    {
        public int SaleDetailId { get; set; }

        public int SaleId { get; set; }

        public int CouponId { get; set; }

        public decimal RegularPrice { get; set; }

        public int Percentage { get; set; }

        public int Quantity { get; set; }

        public decimal Subtotal { get; set; }
    }
}
