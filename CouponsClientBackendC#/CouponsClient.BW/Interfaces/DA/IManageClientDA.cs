using CouponsClient.BC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BW.Interfaces.DA
{
    public interface IManageClientDA
    {
        Task<bool> RegisterClient(Client client);
        Task<Client> SignIn(LoginClient loginClient);
        Task<Client> GetClientById(int clientId);
    }
}
