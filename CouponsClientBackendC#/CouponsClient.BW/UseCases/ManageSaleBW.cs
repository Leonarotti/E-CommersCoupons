using CouponsClient.BC.Models;
using CouponsClient.BW.Interfaces.BW;
using CouponsClient.BW.Interfaces.DA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BW.UseCases
{
    public class ManageSaleBW : IManageSaleBW
    {
        private readonly IManageSaleDA _manageSaleDA;

        public ManageSaleBW(IManageSaleDA manageSaleDA)
        {
            _manageSaleDA = manageSaleDA;
        }

        public async Task<int> RegisterSale(Sale sale)
        {
            return await _manageSaleDA.RegisterSale(sale);
            //validaciones
        }

        public async Task<bool> DeleteSale(int saleId)
        {
            return await _manageSaleDA.DeleteSale(saleId);
            //validaciones
        }

        public async Task<bool> RegisterSaleDetails(IEnumerable<SaleDetail> saleDetails)
        {
            return await _manageSaleDA.RegisterSaleDetails(saleDetails);
            //validaciones
        }

        public async Task<bool> ManagaSalesRecordWithDetails(CouponsSaleCart couponsSaleCart)
        {

            //desencriptar tarjeta


            var sale = new Sale
            {
                ClientId = couponsSaleCart.ClientId,
                SaleDate = DateTime.Now,
                CardNumber = couponsSaleCart.CardNumber,
                Total = couponsSaleCart.TotalAmount
            };

            var saleId = await RegisterSale(sale);
            if (saleId == 0)
            {
                return false;
            }

            var saleDetails = couponsSaleCart.CouponsSale.Select(c => new SaleDetail
            {
                SaleId = saleId,
                CouponId = c.id_coupon,
                RegularPrice = c.regular_price,
                Percentage = c.percentage,
                Quantity = c.quantity,
                Subtotal = (c.regular_price * (c.percentage/100)) * c.quantity
            });

            var response = await RegisterSaleDetails(saleDetails);

            if (!response)
            {
                await DeleteSale(saleId);
                return false;
            }

            return true;
        }
    }
}
