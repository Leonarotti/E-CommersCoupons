using CouponsClient.API.Mappers;
using CouponsClient.BC.Models;
using CouponsClient.BW.Interfaces.BW;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CouponsClient.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponController : ControllerBase
    {
        private readonly IManageCouponBW _manageCouponBW;

        public CouponController(IManageCouponBW manageCouponBW)
        {
            _manageCouponBW = manageCouponBW;
        }

        [HttpGet]
        public async Task<IActionResult> GetCouponsWithDetails()
        {
            try
            {
                var coupons = await _manageCouponBW.GetCouponsWithDetails();
                return Ok(CouponDTOMapper.CouponsMapToCouponsDTO(coupons));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCouponWithDetailsById(int id)
        {
            try
            {
                var coupon = await _manageCouponBW.GetCouponWithDetailsById(id);
                return Ok(CouponDTOMapper.CouponMapToCouponDTO(coupon));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetCouponsSaleWithDetailsByClientId/{clientId}")]
        public async Task<IActionResult> GetCouponsSaleWithDetailsByClientId(int clientId)
        {
            try
            {
                var couponsSaleWithDetails = await _manageCouponBW.GetCouponsSaleWithDetailsByClientId(clientId);
                return Ok(CouponDTOMapper.CouponsSaleWithDetailsMapToCouponsSaleWithDetailsDTO(couponsSaleWithDetails));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
