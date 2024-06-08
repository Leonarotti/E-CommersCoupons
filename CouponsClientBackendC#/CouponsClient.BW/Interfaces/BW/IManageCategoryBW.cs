using CouponsClient.BC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BW.Interfaces.BW
{
    public interface IManageCategoryBW
    {
        Task<IEnumerable<Category>> GetCategories();
    }
}
