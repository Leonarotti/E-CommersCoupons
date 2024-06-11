using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CouponsClient.DA.DataModels
{
    [Table("sale")]
    public class SaleDA
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int id_sale { get; set; }

        [Required]
        public int id_client { get; set; }

        [Required]
        public DateTime sale_date { get; set; }

        [Required]
        public string card_number { get; set; }

        [Required]
        public decimal total { get; set; }


        [ForeignKey("id_client")]
        public ClientDA Client { get; set; }
    }
}
