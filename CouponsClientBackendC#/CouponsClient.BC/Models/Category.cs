using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BC.Models
{
    public class Category
    {
        public int id_category { get; set; }
        public string name { get; set; }
        public bool is_enabled { get; set; }
    }

}
