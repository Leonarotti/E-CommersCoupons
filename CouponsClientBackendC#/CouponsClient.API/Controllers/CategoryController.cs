using CouponsClient.BW.Interfaces.BW;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CouponsClient.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IManageCategoryBW _manageCategoryBW;

        public CategoryController(IManageCategoryBW manageCategoryBW)
        {
            _manageCategoryBW = manageCategoryBW;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                return Ok(await _manageCategoryBW.GetCategories());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
