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
        public async Task<IActionResult> GetCoupons()
        {
            try
            {
                var coupons = await _manageCouponBW.GetCoupons();
                return Ok(CouponDTOMapper.CouponsMapToCouponsDTO(coupons));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
