using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BC.Models
{
    public class CouponSaleWithDetails
    {
        public int CouponId { get; set; }
        public int EnterpriseId { get; set; }
        public string Enterprise { get; set; }
        public int CategoryId { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
        public string Location { get; set; }

        public decimal RegularPrice { get; set; }
        public int Percentage { get; set; }
        public int Quantity { get; set; }
        public decimal Subtotal { get; set; }

        public int SaleId { get; set; }
        public string CardNumber { get; set; }
        public DateTime SaleDate { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
