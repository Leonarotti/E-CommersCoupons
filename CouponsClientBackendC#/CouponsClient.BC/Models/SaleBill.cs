using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BC.Models
{
    public class SaleBill
    {
        public Client Client { get; set; }
        public Sale Sale { get; set; }
        public IEnumerable<SaleDetail> SaleDetails { get; set; }
    }
}
