using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CouponsClient.DA.DataModels
{
    [Table("sale_detail")]
    public class SaleDetailDA
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int id_sale_detail { get; set; }

        [Required]
        public int id_sale { get; set; }

        [Required]
        public int id_coupon { get; set; }

        [Required]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal regular_price { get; set; }

        [Required]
        public int percentage { get; set; }

        [Required]
        public int quantity { get; set; }

        [Required]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal subtotal { get; set; }



        [ForeignKey("id_sale")]
        public SaleDA Sale { get; set; }
    }
}
