using CouponsClient.BC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BW.Interfaces.DA
{
    public interface IManageSaleDA
    {
        Task<int> RegisterSale(Sale sale);
        Task<bool> DeleteSale(int saleId);
        Task<bool> RegisterSaleDetails(IEnumerable<SaleDetail> saleDetails);
        Task<IEnumerable<Sale>> GetSalesByClientId(int clientId);
        Task<IEnumerable<SaleDetail>> GetSaleDetailsBySaleId(int saleId);
    }
}
