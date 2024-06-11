using CouponsClient.BC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BW.Interfaces.BW
{
    public interface IManageSaleBW
    {
        Task<int> RegisterSale(Sale sale);
        Task<bool> DeleteSale(int saleId);
        Task<bool> RegisterSaleDetails(IEnumerable<SaleDetail> saleDetails);
        Task<bool> ManagaSalesRecordWithDetails(CouponsSaleCart couponsSaleCart);

    }
}
