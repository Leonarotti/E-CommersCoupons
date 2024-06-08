using CouponsClient.BC.Constant;
using CouponsClient.BC.Models;
using CouponsClient.BW.Interfaces.SG;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CouponsClient.SG
{
    public class ManageCategorySG : IManageCategorySG
    {
        private readonly HttpClient _httpClient;

        public ManageCategorySG(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            HttpResponseMessage response = await _httpClient.GetAsync("CategoryController.php?enabled=1");
            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Cannot retrieve categories from {URLCoupons_API.URL + "CategoryController.php?enabled=1"}");
            }

            var categoriesString = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(categoriesString))
            {
                return null;
            }

            var categories = JsonSerializer.Deserialize<IEnumerable<Category>>(categoriesString);

            return categories;
        }
    }
}
