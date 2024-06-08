using CouponsClient.BC.Models;
using CouponsClient.BW.Interfaces.BW;
using CouponsClient.BW.Interfaces.SG;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BW.UseCases
{
    public class ManageCouponBW : IManageCouponBW
    {
        private readonly IManageCouponSG _manageCouponSG;

        public ManageCouponBW(IManageCouponSG manageCouponSG)
        {
            _manageCouponSG = manageCouponSG;
        }

        public async Task<IEnumerable<Coupon>> GetCoupons()
        {
            return await _manageCouponSG.GetCoupons();
        }
    }
}
