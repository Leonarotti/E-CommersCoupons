using CouponsClient.BC.Models;
using CouponsClient.BW.Interfaces.DA;
using CouponsClient.DA.Context;
using CouponsClient.DA.DataModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.DA.Actions
{
    public class ManageSaleDA : IManageSaleDA
    {
        private readonly CouponsClientDBContext _context;

        public ManageSaleDA(CouponsClientDBContext context)
        {
            _context = context;
        }

        public async Task<int> RegisterSale(Sale sale)
        {
            var saleDA = new SaleDA
            {
                id_client = sale.ClientId,
                sale_date = sale.SaleDate,
                card_number = sale.CardNumber,
                total = sale.Total
            };
            _context.Sales.Add(saleDA);
            var response = await _context.SaveChangesAsync();

            if (response == 0)
            {
                return 0;
            }

            return saleDA.id_sale;
        }

        public async Task<bool> DeleteSale(int saleId)
        {
            var sale = await _context.Sales.FindAsync(saleId);
            if (sale == null)
            {
                return false;
            }
            _context.Sales.Remove(sale);
            var response = await _context.SaveChangesAsync();
            return response > 0;
        }

        public async Task<bool> RegisterSaleDetails(IEnumerable<SaleDetail> saleDetails)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var saleDetailsDA = saleDetails.Select(sd => new SaleDetailDA
                    {
                        id_sale = sd.SaleId,
                        id_coupon = sd.CouponId,
                        regular_price = sd.RegularPrice,
                        percentage = sd.Percentage,
                        quantity = sd.Quantity,
                        subtotal = sd.Subtotal
                    });

                    await _context.SaleDetails.AddRangeAsync(saleDetailsDA);
                    await _context.SaveChangesAsync();

                    // Commit the transaction
                    await transaction.CommitAsync();

                    return true;
                }
                catch (Exception)
                {
                    // Rollback the transaction
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }
    }
}
