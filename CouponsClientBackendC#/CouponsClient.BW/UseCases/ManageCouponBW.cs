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
        private readonly IManageSaleBW _manageSaleBW;

        public ManageCouponBW(IManageCouponSG manageCouponSG, IManageSaleBW manageSaleBW)
        {
            _manageCouponSG = manageCouponSG;
            _manageSaleBW = manageSaleBW;
        }

        public async Task<Coupon> GetCouponWithDetailsById(int id)
        {
            var coupon = await _manageCouponSG.GetCouponWithDetailsById(id);

            if(coupon == null)
            {
                throw new Exception("Coupon not found");
            }

            return coupon;
        }

        public async Task<IEnumerable<Coupon>> GetCouponsWithDetails()
        {
            return await _manageCouponSG.GetCouponsWithDetails();
        }

        public async Task<IEnumerable<CouponSaleWithDetails>> GetCouponsSaleWithDetailsByClientId(int clientId)
        {
            var couponsSaleWithDetails = new List<CouponSaleWithDetails>();

            var sales = await _manageSaleBW.GetSalesByClientId(clientId);

            foreach (var sale in sales)
            {
                var saleDetails = await _manageSaleBW.GetSaleDetailsBySaleId(sale.SaleId);

                foreach (var saleDetail in saleDetails)
                {
                    var coupon = await GetCouponWithDetailsById(saleDetail.CouponId);

                    couponsSaleWithDetails.Add(new CouponSaleWithDetails
                    {
                        CouponId = coupon.id_coupon,
                        EnterpriseId = coupon.id_enterprise,
                        Enterprise = coupon.enterprise,
                        CategoryId = coupon.id_category,
                        Category = coupon.category,
                        Name = coupon.name,
                        Img = coupon.img,
                        Location = coupon.location,
                        RegularPrice = saleDetail.RegularPrice,
                        Percentage = saleDetail.Percentage,
                        Quantity = saleDetail.Quantity,
                        Subtotal = saleDetail.Subtotal,
                        SaleId = sale.SaleId,
                        CardNumber = sale.CardNumber,
                        SaleDate = sale.SaleDate,
                        TotalAmount = sale.Total
                    });
                }
            }
            
            return couponsSaleWithDetails;

        }
    }
}
