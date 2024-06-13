using CouponsClient.API.DTOs;
using CouponsClient.BC.Models;
using CouponsClient.DA.DataModels;

namespace CouponsClient.API.Mappers
{
    public class SaleDTOMapper
    {
        public static CouponSale CouponSaleDTOMapToCouponSale(CouponSaleDTO couponSaleDTO)
        {
            return new CouponSale
            {
                id_coupon = couponSaleDTO.couponId,
                id_enterprise = couponSaleDTO.enterpriseId,
                enterprise = couponSaleDTO.enterprise,
                id_category = couponSaleDTO.categoryId,
                category = couponSaleDTO.category,
                name = couponSaleDTO.name,
                img = couponSaleDTO.img,
                location = couponSaleDTO.location,
                regular_price = couponSaleDTO.regularPrice,
                percentage = couponSaleDTO.percentageDiscount,
                start_date = couponSaleDTO.startDate,
                end_date = couponSaleDTO.endDate,
                quantity = couponSaleDTO.quantity
            };
        }

        public static CouponsSaleCart CouponsSaleCartDTOMapToCouponsSaleCart(CouponsSaleCartDTO couponsSaleCartDTO)
        {
            return new CouponsSaleCart
            {
                ClientId = couponsSaleCartDTO.clientId,
                CardNumber = couponsSaleCartDTO.cardNumber,
                TotalAmount = couponsSaleCartDTO.totalAmount,
                CouponsSale = couponsSaleCartDTO.couponsSale.Select(c => CouponSaleDTOMapToCouponSale(c))
            };
        }

        public static SaleDTO SaleMapToSaleDTO(Sale sale)
        {
            return new SaleDTO
            {
                saleId = sale.SaleId,
                clientId = sale.ClientId,
                saleDate = sale.SaleDate,
                cardNumber = sale.CardNumber,
                totalAmount = sale.Total
            };
        }

        public static IEnumerable<SaleDTO> SalesMapToSalesDTO(IEnumerable<Sale> sales)
        {
            List<SaleDTO> salesDTO = new List<SaleDTO>();
            foreach (Sale sale in sales)
            {
                salesDTO.Add(SaleMapToSaleDTO(sale));
            }
            return salesDTO;
        }

        public static SaleDetailDTO SaleDetailMapToSaleDetailDTO(SaleDetail saleDetail)
        {
            return new SaleDetailDTO
            {
                saleDetailId = saleDetail.SaleDetailId,
                saleId = saleDetail.SaleId,
                couponId = saleDetail.CouponId,
                regularPrice = saleDetail.RegularPrice,
                percentage = saleDetail.Percentage,
                quantity = saleDetail.Quantity,
                subtotal = saleDetail.Subtotal
            };
        }

        public static IEnumerable<SaleDetailDTO> SaleDetailsMapToSaleDetailsDTO(IEnumerable<SaleDetail> saleDetails)
        {
            List<SaleDetailDTO> saleDetailsDTO = new List<SaleDetailDTO>();
            foreach (SaleDetail saleDetail in saleDetails)
            {
                saleDetailsDTO.Add(SaleDetailMapToSaleDetailDTO(saleDetail));
            }
            return saleDetailsDTO;
        }

    }
}
