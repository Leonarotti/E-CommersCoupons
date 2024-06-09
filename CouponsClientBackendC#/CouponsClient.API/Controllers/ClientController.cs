using CouponsClient.API.DTOs;
using CouponsClient.API.Mappers;
using CouponsClient.BW.Interfaces.BW;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CouponsClient.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IManageClientBW _manageClientBW;

        public ClientController(IManageClientBW manageClientBW)
        {
            _manageClientBW = manageClientBW;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterClient(ClientDTO clientDTO)
        {
            try
            {
                var client = ClientDTOMapper.ClientDTOToClientMap(clientDTO);
                var result = await _manageClientBW.RegisterClient(client);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> LoginClient(LoginClientDTO loginClientDTO)
        {
            try
            {
                var loginClient = ClientDTOMapper.LoginClientDTOToLoginClientMap(loginClientDTO);
                var client = await _manageClientBW.SignIn(loginClient);
                return Ok(ClientDTOMapper.ClientMapToClientDTO(client));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
