using CouponsClient.BC.BusinessLogic;
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
        private readonly IManageClientBW _manageClientBW;

        public ManageSaleBW(IManageSaleDA manageSaleDA, IManageClientBW manageClientBW)
        {
            _manageSaleDA = manageSaleDA;
            _manageClientBW = manageClientBW;
        }

        public async Task<int> RegisterSale(Sale sale)
        {
            return await _manageSaleDA.RegisterSale(sale);
        }

        public async Task<bool> DeleteSale(int saleId)
        {
            return await _manageSaleDA.DeleteSale(saleId);
        }

        public async Task<bool> RegisterSaleDetails(IEnumerable<SaleDetail> saleDetails)
        {
            return await _manageSaleDA.RegisterSaleDetails(saleDetails);
        }

        public async Task<bool> ProcessSaleRecordWithDetails(CouponsSaleCart couponsSaleCart)
        {
            Client client = await _manageClientBW.GetClientById(couponsSaleCart.ClientId);

            if (client == null)
            {
                return false;
            }

            var cardNumber = new Encryptor().Decrypt(couponsSaleCart.CardNumber);

            if (cardNumber == null)
            {
                return false;
            }

            cardNumber = Masking.MaskCardNumber(cardNumber);

            if (string.IsNullOrEmpty(cardNumber))
            {
                return false;
            }

            var sale = new Sale
            {
                ClientId = couponsSaleCart.ClientId,
                SaleDate = DateTime.Now,
                CardNumber = cardNumber,
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
                Subtotal = c.regular_price * (1 - ((decimal)c.percentage / 100)) * c.quantity
            });

            var response = await RegisterSaleDetails(saleDetails);

            if (!response)
            {
                await DeleteSale(saleId);
                return false;
            }

            var saleBill = new SaleBill
            {
                Client = client,
                Sale = sale,
                SaleDetails = saleDetails
            };

            // Generar el PDF en memoria con los datos de la venta
            var pdfStream = GeneratorPDF.GeneratePDF(saleBill);

            // Enviar el correo con el PDF adjunto
            string recipientEmail = client.Email;
            SendingEmails.SendEmailWithPDF(recipientEmail, pdfStream);

            return true;
        }

        public async Task<IEnumerable<Sale>> GetSalesByClientId(int clientId)
        {
            return await _manageSaleDA.GetSalesByClientId(clientId);
        }

        public async Task<IEnumerable<SaleDetail>> GetSaleDetailsBySaleId(int saleId)
        {
            return await _manageSaleDA.GetSaleDetailsBySaleId(saleId);
        }
    }
}
