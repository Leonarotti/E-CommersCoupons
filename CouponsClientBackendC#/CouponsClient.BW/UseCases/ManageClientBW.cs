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
    public class ManageClientBW : IManageClientBW
    {
        private readonly IManageClientDA _manageClientDA;

        public ManageClientBW(IManageClientDA manageClientDA)
        {
            _manageClientDA = manageClientDA;
        }

        public async Task<bool> RegisterClient(Client client)
        {
            return await _manageClientDA.RegisterClient(client);
            //validaciones
        }

        public async Task<Client> SignIn(LoginClient loginClient)
        {

            return await _manageClientDA.SignIn(loginClient);
        }

        public async Task<Client> GetClientById(int clientId)
        {
            return await _manageClientDA.GetClientById(clientId);
        }
    }
}
