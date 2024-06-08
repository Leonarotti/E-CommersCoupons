using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BC.Models
{
    public class Promotion
    {
        public int IdPromotion { get; set; }
        public int IdCoupon { get; set; }
        public Coupon Coupon { get; set; }
        public int Percentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsEnabled { get; set; }
    }

}
