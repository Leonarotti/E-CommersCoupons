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
                return Ok(await _manageCouponBW.GetCoupons());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
