using CouponsClient.API.DTOs;
using CouponsClient.BC.Models;

namespace CouponsClient.API.Mappers
{
    public class ClientDTOMapper
    {
        public static ClientDTO ClientMapToClientDTO(Client client)
        {
            return new ClientDTO
            {
                clientId = client.ClientId,
                dni = client.Dni,
                name = client.Name,
                lastname = client.Lastname,
                birthDate = client.BirthDate,
                email = client.Email,
                password = client.Password
            };
        }

        public static Client ClientDTOToClientMap(ClientDTO clientDTO)
        {
            return new Client
            {
                ClientId = clientDTO.clientId,
                Dni = clientDTO.dni,
                Name = clientDTO.name,
                Lastname = clientDTO.lastname,
                BirthDate = clientDTO.birthDate,
                Email = clientDTO.email,
                Password = clientDTO.password
            };
        }

        public static LoginClient LoginClientDTOToLoginClientMap(LoginClientDTO loginClientDTO)
        {
            return new LoginClient
            {
                Email = loginClientDTO.email,
                Password = loginClientDTO.password
            };
        }
    }
}
