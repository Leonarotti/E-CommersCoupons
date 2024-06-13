using CouponsClient.BC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BW.Interfaces.SG
{
    public interface IManageCouponSG
    {
        Task<IEnumerable<Coupon>> GetCouponsWithDetails();
        Task<Coupon> GetCouponWithDetailsById(int id);
    }
}
