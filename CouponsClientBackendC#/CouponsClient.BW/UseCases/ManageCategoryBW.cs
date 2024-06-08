using CouponsClient.BC.Models;
using CouponsClient.BW.Interfaces.BW;
using CouponsClient.BW.Interfaces.SG;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BW.UseCases
{
    public class ManageCategoryBW : IManageCategoryBW
    {
        private readonly IManageCategorySG _manageCategorySG;

        public ManageCategoryBW(IManageCategorySG manageCategorySG)
        {
            _manageCategorySG = manageCategorySG;
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await _manageCategorySG.GetCategories();
        }
    }
}
