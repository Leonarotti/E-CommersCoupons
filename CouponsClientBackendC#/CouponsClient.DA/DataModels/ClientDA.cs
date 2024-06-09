using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.DA.DataModels
{
    [Table("client")]
    public class ClientDA
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int id_client { get; set; }

        [Required]
        [StringLength(12)]
        public string dni { get; set; }

        [Required]
        [StringLength(30)]
        public string name { get; set; }

        [Required]
        [StringLength(30)]
        public string lastname { get; set; }

        [Required]
        public DateTime birth_date { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string email { get; set; }

        [Required]
        public string password { get; set; }
    }
}
