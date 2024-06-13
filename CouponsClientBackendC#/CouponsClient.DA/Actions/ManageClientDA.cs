using CouponsClient.BC.BusinessLogic;
using CouponsClient.BC.Models;
using CouponsClient.BW.Interfaces.DA;
using CouponsClient.DA.Context;
using CouponsClient.DA.DataModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.DA.Actions
{
    public class ManageClientDA : IManageClientDA
    {
        private readonly CouponsClientDBContext _context;

        public ManageClientDA(CouponsClientDBContext context)
        {
            _context = context;
        }

        public async Task<bool> RegisterClient(Client client)
        {
            ClientDA clientDA = new ClientDA
            {
                dni = client.Dni,
                name = client.Name,
                lastname = client.Lastname,
                birth_date = client.BirthDate,
                email = client.Email,
                password = client.Password
            };

            if (await _context.Clients.AnyAsync(c => c.dni == client.Dni || c.email == client.Email))
            {
                return false; // (false, message)
            }

            await _context.Clients.AddAsync(clientDA);

            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<Client> SignIn(LoginClient loginClient)
        {
            var encryptedPassword = new Encryptor().Decrypt(loginClient.Password);

            var clientDA = await _context.Clients.FirstOrDefaultAsync(c => c.email == loginClient.Email);

            if (clientDA == null)
            {
                return null; // Usuario no encontrado
            }

            var decryptedStoredPassword = new Encryptor().Decrypt(clientDA.password);

            if (encryptedPassword != decryptedStoredPassword)
            {
                return null; // Contraseña incorrecta
            }

            return new Client
            {
                ClientId = clientDA.id_client,
                Dni = clientDA.dni,
                Name = clientDA.name,
                Lastname = clientDA.lastname,
                BirthDate = clientDA.birth_date,
                Email = clientDA.email,
                Password = clientDA.password
            };
        }

    }
}
