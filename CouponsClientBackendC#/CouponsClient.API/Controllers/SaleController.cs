using CouponsClient.API.DTOs;
using CouponsClient.API.Mappers;
using CouponsClient.BC.Models;
using CouponsClient.BW.Interfaces.BW;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CouponsClient.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly IManageSaleBW _manageSaleBW;

        public SaleController(IManageSaleBW manageSaleBW)
        {
            _manageSaleBW = manageSaleBW;
        }

        [HttpPost("processSaleRecordWithDetails")]
        public async Task<IActionResult> RegisterSale(CouponsSaleCartDTO couponsSaleCartDTO)
        {
            try
            {
                var couponsSaleCart = SaleDTOMapper.CouponsSaleCartDTOMapToCouponsSaleCart(couponsSaleCartDTO);
                Console.WriteLine(couponsSaleCart);
                var result = await _manageSaleBW.ProcessSaleRecordWithDetails(couponsSaleCart);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{clientId}")]
        public async Task<IActionResult> GetSalesByClientId(int clientId)
        {
            try
            {
                var sales = await _manageSaleBW.GetSalesByClientId(clientId);
                return Ok(SaleDTOMapper.SalesMapToSalesDTO(sales));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetSaleDetailsBySaleId/{saleId}")]
        public async Task<IActionResult> GetSaleDetailsBySaleId(int saleId)
        {
            try
            {
                var saleDetails = await _manageSaleBW.GetSaleDetailsBySaleId(saleId);
                return Ok(SaleDTOMapper.SaleDetailsMapToSaleDetailsDTO(saleDetails));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
