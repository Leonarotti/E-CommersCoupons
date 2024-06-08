using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BC.Models
{
    public class Coupon
    {
        public int id_coupon { get; set; }
        public int id_enterprise { get; set; }
        public string enterprise { get; set; }
        public int id_category { get; set; }
        public string category { get; set; }
        public string name { get; set; }
        public string img { get; set; }
        public string location { get; set; }
        public decimal regular_price { get; set; }
        public int percentage { get; set; }
        public DateTime start_date { get; set; }
        public DateTime end_date { get; set; }
        public bool is_enabled { get; set; }
    }

}
